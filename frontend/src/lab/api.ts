export class LabRequestError extends Error {}

export async function postLab<T>(
  path: string,
  payload: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new LabRequestError(`Lab request failed (${response.status})`);
  }
  const error = result && typeof result === "object" && "error" in result
    ? String((result as { error?: unknown }).error || "")
    : "";
  if (!response.ok || error) {
    throw new LabRequestError(error || `Lab request failed (${response.status})`);
  }
  return result as T;
}

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return window.btoa(binary);
}

export function base64ToBytes(encoded: string): Uint8Array {
  const binary = window.atob(encoded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}
