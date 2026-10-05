import { useState, useEffect, useRef, useCallback } from 'react';
import { apiUrl } from '../utils/api';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, MailCheck, ArrowLeft, RefreshCw } from 'lucide-react';

// API base via `apiUrl`
const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // seconds

export function VerifyOTP() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const { login } = useAuth();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Countdown timer
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-start countdown
  useEffect(() => {
    if (!email) { navigate('/register', { replace: true }); return; }
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [email, navigate]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleDigitChange = (index: number, value: string) => {
    // Allow only digits, take last char if pasted multi-char
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    setError('');
    if (digit && index < OTP_LENGTH - 1) focusInput(index + 1);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      } else if (index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newDigits = [...digits];
    pasted.split('').forEach((char, i) => { newDigits[i] = char; });
    setDigits(newDigits);
    setError('');
    focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const handleVerify = useCallback(async () => {
    const otp = digits.join('');
    if (otp.length < OTP_LENGTH) { setError('Please enter the complete 6-digit code'); return; }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(apiUrl('/api/auth/verify-otp'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); return; }

      // Store token and redirect
      localStorage.setItem('token', data.token);
      setSuccess(true);
      setTimeout(() => navigate('/my-orders', { replace: true }), 1500);
    } catch {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [digits, email, navigate]);

  // Auto-submit when all 6 digits are filled
  useEffect(() => {
    if (digits.every(d => d !== '') && !loading && !success) {
      handleVerify();
    }
  }, [digits, loading, success, handleVerify]);

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      const res = await fetch(apiUrl('/api/auth/resend-otp'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setDigits(Array(OTP_LENGTH).fill(''));
        setCountdown(RESEND_COOLDOWN);
        focusInput(0);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const formatTime = (seconds: number) =>
    `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-orange-900/10 p-8">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${success ? 'bg-green-100' : 'bg-[#fff3e0]'}`}>
            {success
              ? <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              : <MailCheck className="w-8 h-8 text-[#f78e00]" />
            }
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
          {success ? 'Verified!' : 'Check your email'}
        </h1>
        <p className="text-sm text-gray-500 text-center mb-2">
          {success
            ? 'Your account is verified. Redirecting…'
            : <>We sent a 6-digit code to</>
          }
        </p>
        {!success && (
          <p className="text-sm font-semibold text-[#f78e00] text-center mb-6 break-all">{email}</p>
        )}

        {/* OTP boxes */}
        {!success && (
          <>
            <div className="flex gap-2 justify-center mb-4" onPaste={handlePaste}>
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleDigitChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  onFocus={e => e.target.select()}
                  disabled={loading}
                  className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
                    ${digit ? 'border-[#f78e00] bg-[#fff8f0] text-[#e07e00]' : 'border-gray-200 text-gray-900'}
                    ${error ? 'border-red-400 bg-red-50' : ''}
                    focus:border-[#f78e00] focus:bg-[#fff8f0]
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 text-center mb-4 flex items-center justify-center gap-1">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}

            {/* Verify button */}
            <button
              onClick={handleVerify}
              disabled={loading || digits.join('').length < OTP_LENGTH}
              className="w-full py-3 bg-[#f78e00] text-white font-semibold rounded-xl hover:bg-[#e07e00] transition-colors shadow-lg shadow-[#f78e00]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-5"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Verifying…</> : 'Verify Account'}
            </button>

            {/* Timer + Resend */}
            <div className="text-center text-sm text-gray-500">
              {countdown > 0 ? (
                <span>Resend code in <span className="font-semibold text-gray-700 tabular-nums">{formatTime(countdown)}</span></span>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="inline-flex items-center gap-1.5 text-[#f78e00] hover:text-[#e07e00] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resending ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                  {resending ? 'Sending…' : 'Resend code'}
                </button>
              )}
            </div>
          </>
        )}

        {/* Back to register */}
        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} /> Back to registration
          </Link>
        </div>
      </div>
    </div>
  );
}
