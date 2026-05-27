export const API = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && (window as any).REACT_APP_API_URL) || '';

export function apiUrl(path: string) {
  const base = API.replace(/\/$/, '');
  if (!base) return path.startsWith('/') ? path : `/${path}`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
