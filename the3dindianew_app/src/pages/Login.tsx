import { useState } from 'react';
import { apiUrl } from '../utils/api';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { AuthButton } from '../components/auth/AuthButton';

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/my-orders';

  // ── State ──────────────────────────────────────────────────────────────────
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; submit?: string }>({});

  // ── Validation ─────────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid email or password. Please try again.';
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  // ── Social handlers ────────────────────────────────────────────────────────
  const handleGoogleLogin = () => {
    setLoading(true);
    try {
      if (!window.google) {
        setErrors({ submit: 'Google Sign-In not available. Please load the page again.' });
        setLoading(false);
        return;
      }

      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: '905704208661-ugfboe0dbbva1k8ufuv3c9jgr27hdjsj.apps.googleusercontent.com',
        callback: async (response: any) => {
          if (response.access_token) {
            try {
              const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${response.access_token}` },
              });
              const userInfo = await userResponse.json();
              const googleResponse = await fetch(apiUrl('/api/auth/google'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: userInfo.email,
                  name: userInfo.name,
                  picture: userInfo.picture,
                }),
              });
              const data = await googleResponse.json();
              if (data.success) {
                localStorage.setItem('token', data.token);
                navigate(from, { replace: true });
              } else {
                setErrors({ submit: data.error || 'Google login failed' });
              }
            } catch (err) {
              setErrors({ submit: 'Failed to fetch Google user info' });
            } finally {
              setLoading(false);
            }
          }
        },
      });
      tokenClient.requestAccessToken();
    } catch (err) {
      setErrors({ submit: 'Google login error. Please try again.' });
      setLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    try {
      const GITHUB_CLIENT_ID = '0ecf1bc06b3e7a75c2a9';
      const REDIRECT_URI = `${window.location.origin}/auth/github/callback`;
      const SCOPE = 'user:email';
      const STATE = Math.random().toString(36).substring(2, 15);

      sessionStorage.setItem('github_oauth_state', STATE);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
      )}&scope=${encodeURIComponent(SCOPE)}&state=${STATE}`;

      window.location.href = authUrl;
    } catch (err) {
      setErrors({ submit: 'GitHub login error. Please try again.' });
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Alert */}
        {errors.submit && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{errors.submit}</span>
          </div>
        )}

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3">
          <AuthButton
            type="button"
            variant="social"
            onClick={handleGoogleLogin}
            disabled={loading}
            icon={<GoogleIcon />}
          >
            Google
          </AuthButton>
          <AuthButton
            type="button"
            variant="social"
            onClick={handleGitHubLogin}
            disabled={loading}
            icon={<GitHubIcon />}
          >
            GitHub
          </AuthButton>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Email Input */}
        <AuthInput
          label="Email address"
          icon={<MailIcon />}
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
          required
          autoComplete="email"
          disabled={loading}
        />

        {/* Password Input */}
        <AuthInput
          label="Password"
          icon={<LockIcon />}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          required
          showPasswordToggle
          autoComplete="current-password"
          disabled={loading}
        />

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
              className="w-4 h-4 rounded border-gray-300 text-[#f78e00] focus:ring-[#f78e00]/30 cursor-pointer disabled:opacity-50"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-[#f78e00] hover:text-[#e07e00] transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <AuthButton
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </AuthButton>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-[#f78e00] hover:text-[#e07e00] transition-colors"
          >
            Create free account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
