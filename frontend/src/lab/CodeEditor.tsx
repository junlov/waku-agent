import { useEffect, useRef } from "react";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  placeholder as editorPlaceholder,
} from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";

interface CodeEditorProps {
  content: string;
  path: string;
  readOnly: boolean;
  onChange: (content: string) => void;
  onSave: () => void;
}

export function CodeEditor({ content, path, readOnly, onChange, onSave }: CodeEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const saveRef = useRef(onSave);
  const changeRef = useRef(onChange);
  const knownContentRef = useRef(content);
  saveRef.current = onSave;
  changeRef.current = onChange;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    knownContentRef.current = content;
    const saveKey = {
      key: "Mod-s",
      preventDefault: true,
      run: () => {
        saveRef.current();
        return true;
      },
    };
    const view = new EditorView({
      parent: host,
      state: EditorState.create({
        doc: content,
        extensions: [
          lineNumbers(),
          history(),
          markdown(),
          oneDark,
          EditorView.lineWrapping,
          EditorView.editable.of(!readOnly),
          EditorState.readOnly.of(readOnly),
          editorPlaceholder(readOnly ? "Preview files unlock when this chapter is runnable." : "Start writing…"),
          keymap.of([saveKey, indentWithTab, ...defaultKeymap, ...historyKeymap]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const next = update.state.doc.toString();
              knownContentRef.current = next;
              changeRef.current(next);
            }
          }),
          EditorView.theme({
            "&": { height: "100%", fontSize: "13px" },
            ".cm-scroller": { overflow: "auto", fontFamily: "var(--mono)" },
            ".cm-content": { padding: "12px 0" },
          }),
        ],
      }),
    });
    viewRef.current = view;
    return () => {
      viewRef.current = null;
      view.destroy();
    };
  }, [path, readOnly]);

  // Apply genuine external content changes (a server-normalized save, a file
  // rewritten outside the editor) as a targeted dispatch instead of remounting,
  // so cursor, selection, and undo history survive.
  useEffect(() => {
    const view = viewRef.current;
    if (!view || content === knownContentRef.current) return;
    knownContentRef.current = content;
    if (content === view.state.doc.toString()) return;
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: content } });
  }, [content]);

  return <div ref={hostRef} className="wf-code-editor" aria-label={`Editor for ${path}`} />;
}
