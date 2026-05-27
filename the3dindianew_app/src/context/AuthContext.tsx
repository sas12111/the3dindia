import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API, apiUrl } from '../utils/api';

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, mobile: string) => Promise<{ requiresVerification: boolean; email: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]     = useState<User | null>(null);
  const [token, setToken]   = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (!stored) { setLoading(false); return; }
    fetch(apiUrl('/api/auth/me'), { headers: { Authorization: `Bearer ${stored}` } })
      .then(r => r.json())
      .then(data => { if (data.success) { setUser(data.user); setToken(stored); } else { localStorage.removeItem('token'); } })
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res  = await fetch(apiUrl('/api/auth/login'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string, mobile: string): Promise<{ requiresVerification: boolean; email: string }> => {
    const res  = await fetch(apiUrl('/api/auth/register'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, mobile }) });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    // Registration now requires OTP verification — do NOT log in yet
    return { requiresVerification: true, email: data.email };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
