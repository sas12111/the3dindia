import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
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

const InfoIcon = () => (
  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

export function ForgotPassword() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; submit?: string }>({});
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  // ── Validation ─────────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
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
      // Simulate API call to send reset email
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSentEmail(email);
      setSent(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send reset link. Please try again.';
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (sent) {
    return (
      <AuthLayout title="Check your email">
        <div>
          {/* Success icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success message */}
          <p className="text-sm text-gray-500 mb-1">
            We sent a password reset link to
          </p>
          <p className="text-sm font-semibold text-gray-800 mb-6 break-all">{sentEmail}</p>

          {/* Hint */}
          <p className="text-xs text-gray-400 mb-7">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => {
                setSent(false);
                setEmail('');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              try again
            </button>
            .
          </p>

          {/* Back button */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <ArrowLeftIcon />
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Default state ──────────────────────────────────────────────────────────
  return (
    <AuthLayout title="Forgot password?" subtitle="No worries, we'll send you reset instructions">
      {/* Info Alert */}
      <div className="flex items-start gap-3 px-3.5 py-3 bg-blue-50 border border-blue-200 rounded-lg mb-5">
        <div className="flex-shrink-0 mt-0.5">
          <InfoIcon />
        </div>
        <p className="text-sm text-blue-700 leading-relaxed">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {/* Error Alert */}
      {errors.submit && (
        <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-start gap-2">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{errors.submit}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          autoFocus
        />

        {/* Submit Button */}
        <AuthButton
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Send reset link'}
        </AuthButton>
      </form>

      {/* Back to sign in */}
      <div className="mt-5 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <ArrowLeftIcon />
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
