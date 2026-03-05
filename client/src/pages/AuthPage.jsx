import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, CheckSquare } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register, googleAuth, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate('/app'); }, [user]);

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_google_client_id',
        callback: async (cr) => {
          setLoading(true);
          try { await googleAuth(cr.credential); navigate('/app'); }
          catch { setError('Google sign in failed'); }
          finally { setLoading(false); }
        },
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        { theme: 'outline', size: 'large', width: '100%', text: 'continue_with' }
      );
    }
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally { setLoading(false); }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 placeholder-ink-400 dark:placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition text-sm";

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex items-center justify-center p-4 transition-colors">

      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl z-0 opacity-[0.06] dark:opacity-10"
        style={{ background: 'radial-gradient(ellipse, #f59e0b 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-8 mx-auto w-fit hover:opacity-80 transition">
          <CheckSquare className="text-amber-500" size={24} />
          <span className="text-2xl font-black tracking-tight">TaskFlow</span>
        </button>

        <div className="bg-white dark:bg-ink-900 rounded-2xl shadow-xl shadow-ink-200/60 dark:shadow-none border border-ink-100 dark:border-ink-800 p-8">
          <h1 className="text-2xl font-black tracking-tight mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-ink-400 dark:text-ink-500 text-sm mb-6">
            {mode === 'login' ? 'Sign in to your account' : 'Start managing your tasks for free'}
          </p>

          {error && (
            <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 mb-1.5 uppercase tracking-wide">Name</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputClass} placeholder="Your name" required />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 mb-1.5 uppercase tracking-wide">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={inputClass} placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink-500 dark:text-ink-400 mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className={inputClass + ' pr-11'} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 dark:hover:text-ink-300 transition">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-white dark:text-ink-950 font-bold rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-amber-500/20 mt-2">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-ink-100 dark:bg-ink-800" />
            <span className="text-xs text-ink-300 dark:text-ink-600 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-ink-100 dark:bg-ink-800" />
          </div>

          <div id="google-btn" className="flex justify-center min-h-[44px]" />

          <p className="text-center text-sm text-ink-400 dark:text-ink-500 mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-amber-500 hover:text-amber-400 font-bold transition">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <div className="mt-4 pt-4 border-t border-ink-100 dark:border-ink-800">
            <button onClick={() => navigate('/app')}
              className="w-full text-center text-sm text-ink-400 hover:text-ink-600 dark:hover:text-ink-300 transition font-medium">
              Continue as guest →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}