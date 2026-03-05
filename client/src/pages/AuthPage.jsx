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

  useEffect(() => {
    if (user) navigate('/app');
  }, [user]);

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_google_client_id',
        callback: async (credentialResponse) => {
          setLoading(true);
          try {
            await googleAuth(credentialResponse.credential);
            navigate('/app');
          } catch {
            setError('Google sign in failed');
          } finally {
            setLoading(false);
          }
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
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <CheckSquare className="text-amber-500" size={24} />
          <span className="text-2xl font-black tracking-tight text-ink-100">TaskFlow</span>
        </div>

        <div className="bg-ink-900 rounded-2xl shadow-xl border border-ink-800 p-8">
          <h1 className="text-2xl font-bold mb-1 text-ink-100">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-ink-500 text-sm mb-6">
            {mode === 'login' ? 'Sign in to your account' : 'Start managing your tasks'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-ink-300">Name</label>
                <input type="text" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-ink-700 bg-ink-800 text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  placeholder="Your name" required />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-ink-300">Email</label>
              <input type="email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-ink-700 bg-ink-800 text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-ink-300">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-ink-700 bg-ink-800 text-ink-100 placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-ink-950 font-bold rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-ink-800" />
            <span className="text-xs text-ink-600">or</span>
            <div className="flex-1 h-px bg-ink-800" />
          </div>

          <div id="google-btn" className="flex justify-center" />

          <p className="text-center text-sm text-ink-500 mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-amber-500 hover:text-amber-400 font-semibold">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <button onClick={() => navigate('/app')}
            className="w-full text-center text-sm text-ink-600 hover:text-ink-400 mt-3 transition">
            Continue as guest →
          </button>
        </div>
      </div>
    </div>
  );
}