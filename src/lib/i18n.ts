export function translateKey(
  dict: Record<string, unknown>,
  key: string,
): string {
  const value = dict[key];
  return typeof value === "string" ? value : key;
}
