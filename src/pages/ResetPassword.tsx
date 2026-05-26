import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';

export function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  const leftContent = (
    <>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
            <Lock size={20} className="text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-xl tracking-tight">The3DIndia</span>
            <p className="text-blue-200 text-xs">India's Trusted 3D Printing Partner</p>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white leading-tight mb-4">Secure your<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">account.</span></h2>
        <p className="text-blue-100 text-base mb-8 leading-relaxed max-w-sm">Choose a strong password to keep your 3D printing orders and personal data secure.</p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: <Lock size={20} />, title: 'Strong Password', desc: 'Use 6+ characters' },
            { icon: <CheckCircle size={20} />, title: 'Secure Storage', desc: 'Encrypted password' },
            { icon: <Shield size={20} />, title: 'Account Protection', desc: '2FA available' },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="text-white">{f.icon}</div>
              </div>
              <div>
                <p className="text-white font-medium text-sm mb-0.5">{f.title}</p>
                <p className="text-blue-200/70 text-xs leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl">
          <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_, i) => <Lock key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}</div>
          <p className="text-white text-sm leading-relaxed italic">"The password reset was quick and secure. I appreciate the strong password requirements."</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold">P</div>
            <div><p className="text-white text-sm">Priya Patel</p><p className="text-blue-200/70 text-xs">Product Designer, Bangalore</p></div>
          </div>
        </div>
      </div>
    </>
  );

  if (success) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Password Reset!</h2>
          <p className="text-gray-600 mb-6">Your password has been successfully updated. You can now sign in with your new password.</p>
          <Link to="/login" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-200" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
            Sign In Now <ArrowRight size={14} />
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout leftContent={leftContent}>
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8">
          <Link to="/forgot-password" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"><ArrowLeft size={18} /> Back to Forgot Password</Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">New Password</h1>
          <p className="text-gray-500 text-sm">Create a strong password to secure your account.</p>
        </div>
        {error && <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 animate-shake"><span className="mt-0.5 flex-shrink-0">⚠</span><span>{error}</span></div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={16} /></div>
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" placeholder="Create a strong password" className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-gray-400" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" tabIndex={-1}>{showPw ? <Lock size={16} /> : <Lock size={16} />}</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={16} /></div>
              <input type={showPw ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required autoComplete="new-password" placeholder="Re-enter your password" className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 hover:border-gray-400 ${confirmPassword ? password === confirmPassword ? 'border-green-300 focus:border-green-500' : 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`} />
              <div className="absolute right-11 top-1/2 -translate-y-1/2">
                {confirmPassword && (password === confirmPassword ? <CheckCircle size={16} className="text-green-500" /> : <span className="text-red-400 text-sm">✕</span>)}
              </div>
            </div>
            {confirmPassword && password !== confirmPassword && <p className="mt-1 text-xs text-red-500">Passwords do not match</p>}
          </div>
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0" style={{ background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
            {loading ? <><Loader2 size={16} className="animate-spin" /> Resetting password…</> : <>Reset Password <ArrowRight size={14} /></>}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}