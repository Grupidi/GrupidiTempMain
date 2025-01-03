export function normalizeUsername(username: string | undefined | null): string {
  if (!username) return '';
  return username.startsWith('@') ? username.substring(1) : username;
}

export function formatUsername(username: string): string {
  return normalizeUsername(username) ? `@${normalizeUsername(username)}` : '';
}

export function stripUsername(username: string): string {
  return normalizeUsername(username);
}