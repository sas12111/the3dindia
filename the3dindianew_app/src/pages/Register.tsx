import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { AuthButton } from '../components/auth/AuthButton';

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

// ── Password strength indicator ────────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  let strength = 0;
  let label = '';
  let color = '';

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;

  switch (strength) {
    case 0:
    case 1:
      label = 'Weak';
      color = 'bg-red-500';
      break;
    case 2:
      label = 'Fair';
      color = 'bg-yellow-500';
      break;
    case 3:
      label = 'Good';
      color = 'bg-blue-500';
      break;
    case 4:
      label = 'Strong';
      color = 'bg-green-500';
      break;
  }

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-200`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirm?: string;
    terms?: string;
    submit?: string;
  }>({});

  // ── Validation ─────────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.trim().split(' ').length < 2) {
      newErrors.name = 'Please enter your first and last name';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (phone && !/^[+0-9\-\s()]{10,}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirm) {
      newErrors.confirm = 'Please confirm your password';
    } else if (password !== confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    if (!terms) {
      newErrors.terms = 'You must accept the Terms of Service and Privacy Policy';
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
      const result = await register(name, email, password, phone);
      if (result.requiresVerification) {
        navigate(`/verify-otp?email=${encodeURIComponent(result.email)}`, { replace: true });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  // ── Social handlers ────────────────────────────────────────────────────────
  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    console.log('Google signup - not implemented yet');
  };

  const handleGitHubSignup = () => {
    // TODO: Implement GitHub OAuth
    console.log('GitHub signup - not implemented yet');
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start your 3D printing journey today">
      {/* Error Alert */}
      {errors.submit && (
        <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-start gap-2">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{errors.submit}</span>
        </div>
      )}

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <AuthButton
          variant="social"
          onClick={handleGoogleSignup}
          disabled={loading}
          icon={<GoogleIcon />}
        >
          Google
        </AuthButton>
        <AuthButton
          variant="social"
          onClick={handleGitHubSignup}
          disabled={loading}
          icon={<GitHubIcon />}
        >
          GitHub
        </AuthButton>
      </div>

      {/* Divider */}
      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs text-gray-400">Or continue with</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <AuthInput
          label="Full Name"
          icon={<UserIcon />}
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={setName}
          error={errors.name}
          required
          autoComplete="name"
          disabled={loading}
        />

        {/* Email + Phone (responsive grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuthInput
            label="Email"
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
          <AuthInput
            label="Phone (Optional)"
            icon={<PhoneIcon />}
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={setPhone}
            error={errors.phone}
            autoComplete="tel"
            disabled={loading}
          />
        </div>

        {/* Password */}
        <AuthInput
          label="Password"
          icon={<LockIcon />}
          type="password"
          placeholder="Create a strong password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          required
          showPasswordToggle
          autoComplete="new-password"
          disabled={loading}
        />

        {/* Password Strength Indicator */}
        {password && <PasswordStrength password={password} />}

        {/* Confirm Password */}
        <AuthInput
          label="Confirm Password"
          icon={<LockIcon />}
          type="password"
          placeholder="Confirm your password"
          value={confirm}
          onChange={setConfirm}
          error={errors.confirm}
          required
          showPasswordToggle
          autoComplete="new-password"
          disabled={loading}
        />

        {/* Terms & Privacy */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              disabled={loading}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/30 cursor-pointer flex-shrink-0 disabled:opacity-50"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              I agree to the{' '}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Terms of Service
              </a>
              {' '}and{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1.5 text-xs text-red-600">{errors.terms}</p>
          )}
        </div>

        {/* Submit Button */}
        <AuthButton
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Creating account…' : 'Create Account'}
        </AuthButton>
      </form>

      {/* Sign in link */}
      <p className="mt-5 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
