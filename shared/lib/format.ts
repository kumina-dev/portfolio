export function normalizeUrlLabel(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}