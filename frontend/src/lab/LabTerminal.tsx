import { useEffect, useRef, useState } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { base64ToBytes, bytesToBase64, postLab } from "./api.js";

interface TerminalOpenResponse {
  terminal_id: string;
}

interface TerminalFrame {
  kind: "output" | "exit" | "heartbeat" | "gap" | "error";
  data?: string;
  exit_code?: number;
  error?: string;
}

interface LabTerminalProps {
  sessionId: string;
  stepId: string;
  enabled: boolean;
  height: number;
  onActiveChange: (active: boolean) => void;
  onAttemptClosed: () => void;
}

type TerminalStatus = "idle" | "opening" | "live" | "closed" | "error" | "disconnected";

// Mirror the backend's accepted PTY bounds (waku/ops/lab_terminal.py) so a
// degenerate fit (hidden panel, collapsed host) is never POSTed.
const MIN_ROWS = 2;
const MIN_COLUMNS = 10;

export function LabTerminal({
  sessionId,
  stepId,
  enabled,
  height,
  onActiveChange,
  onAttemptClosed,
}: LabTerminalProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const terminalIdRef = useRef<string | null>(null);
  const inputChainRef = useRef<Promise<void>>(Promise.resolve());
  const finalizeRef = useRef<((reportErrors?: boolean) => Promise<void>) | null>(null);
  const [requested, setRequested] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [status, setStatus] = useState<TerminalStatus>("idle");
  const [error, setError] = useState("");

  const live = enabled && requested;

  // Input frames are pinned to the terminal they were typed into and chained
  // one POST at a time: the threaded dashboard server can otherwise complete
  // concurrent keystroke requests out of order and garble the PTY input.
  const queueInput = (bytes: Uint8Array, forTerminal: string | null) => {
    if (!forTerminal) return;
    const data = bytesToBase64(bytes);
    inputChainRef.current = inputChainRef.current
      .then(async () => {
        if (terminalIdRef.current !== forTerminal) return;
        await postLab("/api/lab/terminal/input", { terminal_id: forTerminal, data });
      })
      .catch((caught: unknown) => {
        setError(caught instanceof Error ? caught.message : "Terminal input failed");
      });
  };

  useEffect(() => {
    if (!live || !hostRef.current) return;
    const abort = new AbortController();
    const terminal = new Terminal({
      cursorBlink: true,
      convertEol: false,
      screenReaderMode: true,
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      fontSize: 13,
      lineHeight: 1.25,
      theme: {
        background: "#101217",
        foreground: "#e4e7ee",
        cursor: "#e2a94a",
        selectionBackground: "#59627a88",
      },
    });
    const fit = new FitAddon();
    terminal.loadAddon(fit);
    terminal.open(hostRef.current);
    terminalRef.current = terminal;
    fit.fit();
    inputChainRef.current = Promise.resolve();
    setStatus("opening");
    setError("");
    let closed = false;
    let finalizing = false;
    let terminated = false;

    const finalizeTerminal = async (reportErrors = true) => {
      const terminalId = terminalIdRef.current;
      if (!terminalId || finalizing) return;
      finalizing = true;
      try {
        await postLab("/api/lab/terminal/close", { terminal_id: terminalId });
        terminalIdRef.current = null;
        onAttemptClosed();
      } catch (caught) {
        finalizing = false; // allow a later cleanup/reopen path to retry the close
        if (reportErrors && !abort.signal.aborted) {
          setError(caught instanceof Error ? caught.message : "Terminal close failed");
        }
      } finally {
        onActiveChange(false);
        abort.abort();
      }
    };
    finalizeRef.current = finalizeTerminal;

    const failStream = (message: string, nextStatus: TerminalStatus) => {
      if (terminated) return;
      terminated = true;
      setError(message);
      setStatus(nextStatus);
      onActiveChange(false);
    };

    const writeFrame = async (frame: TerminalFrame) => {
      if (frame.kind === "output" && frame.data) {
        terminal.write(base64ToBytes(frame.data));
      } else if (frame.kind === "gap") {
        terminal.writeln("[Earlier terminal output was compacted.]");
      } else if (frame.kind === "exit") {
        terminated = true;
        terminal.writeln(`[process exited ${frame.exit_code ?? ""}]`);
        setStatus("closed");
        void finalizeTerminal();
      } else if (frame.kind === "error") {
        const message = frame.error || "The terminal stream reported a server error.";
        terminal.writeln(`[server: ${message}]`);
        failStream(message, "error");
      }
    };

    const stream = async (terminalId: string) => {
      const response = await fetch("/api/lab/terminal/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ terminal_id: terminalId }),
        signal: abort.signal,
      });
      const contentType = response.headers.get("Content-Type") || "";
      if (!response.ok || !response.body || !contentType.includes("text/event-stream")) {
        const result = await response.json().catch(() => ({})) as { error?: string };
        throw new Error(result.error || `Terminal stream failed (${response.status})`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let boundary = buffer.indexOf("\n\n");
        while (boundary >= 0) {
          const event = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);
          // SSE data fields accumulate across lines, each dropping one
          // optional leading space, joined back with newlines.
          const data = event
            .split("\n")
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5).replace(/^ /, ""))
            .join("\n");
          if (data) await writeFrame(JSON.parse(data) as TerminalFrame);
          boundary = buffer.indexOf("\n\n");
        }
      }
    };

    postLab<TerminalOpenResponse>("/api/lab/terminal/open", {
      session_id: sessionId,
      rows: terminal.rows,
      columns: terminal.cols,
    }, abort.signal).then((opened) => {
      if (closed) return;
      terminalIdRef.current = opened.terminal_id;
      setStatus("live");
      onActiveChange(true);
      terminal.focus();
      terminal.onData((data) => {
        queueInput(new TextEncoder().encode(data), terminalIdRef.current);
      });
      stream(opened.terminal_id).then(() => {
        if (!abort.signal.aborted) {
          failStream("The terminal stream ended before the process exited. Reopen the terminal to continue.", "disconnected");
        }
      }).catch((caught) => {
        if (!abort.signal.aborted) {
          failStream(caught instanceof Error ? caught.message : "Terminal stream failed", "error");
        }
      });
    }).catch((caught) => {
      if (!abort.signal.aborted) {
        failStream(caught instanceof Error ? caught.message : "Terminal failed to open", "error");
      }
    });

    const resize = new ResizeObserver(() => {
      const host = hostRef.current;
      const terminalId = terminalIdRef.current;
      if (!host || !terminalId) return;
      const box = host.getBoundingClientRect();
      if (box.width < 20 || box.height < 20) return; // hidden or collapsed: fit() would compute garbage
      fit.fit();
      if (terminal.rows < MIN_ROWS || terminal.cols < MIN_COLUMNS) return;
      void postLab("/api/lab/terminal/resize", {
        terminal_id: terminalId,
        rows: terminal.rows,
        columns: terminal.cols,
      }).catch(() => undefined);
    });
    resize.observe(hostRef.current);

    return () => {
      closed = true;
      resize.disconnect();
      if (terminalIdRef.current) {
        void finalizeTerminal(false);
      } else {
        abort.abort();
        onActiveChange(false);
      }
      finalizeRef.current = null;
      terminal.dispose();
      terminalRef.current = null;
    };
  }, [live, generation, onActiveChange, onAttemptClosed, sessionId, stepId]);

  const sendInterrupt = () => {
    queueInput(new Uint8Array([3]), terminalIdRef.current);
  };

  const close = () => {
    if (!terminalIdRef.current) return;
    setStatus("closed");
    // Route through the effect's idempotent finalize: the process-exit frame
    // and this button must never each POST their own close.
    void finalizeRef.current?.(true);
  };

  const reopen = () => {
    setError("");
    setGeneration((value) => value + 1);
  };

  return (
    <section className="wf-terminal-panel" style={{ height }} aria-label="Interactive terminal">
      <header>
        <span><i className={`is-${status}`} /> sandbox · {status}</span>
        <span className="wf-terminal-controls">
          <button type="button" onClick={sendInterrupt} disabled={status !== "live"} aria-label="Send Control-C">Ctrl-C</button>
          <button type="button" onClick={close} disabled={status !== "live"}>Close terminal</button>
        </span>
      </header>
      {live ? <div ref={hostRef} className="wf-terminal-host" /> : null}
      {!live ? (
        <div className="wf-terminal-idle">
          <p>The interactive PTY stays closed until you ask for it. While a terminal is open, checkpoint, reset, and completion stay locked.</p>
          <button type="button" onClick={() => setRequested(true)}>Open terminal</button>
        </div>
      ) : null}
      {live && (status === "closed" || status === "error" || status === "disconnected") ? (
        <div className="wf-terminal-idle">
          <button type="button" onClick={reopen}>Reopen terminal</button>
        </div>
      ) : null}
      {error ? <p className="wf-workbench-error" role="alert">{error}</p> : null}
    </section>
  );
}
