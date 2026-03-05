import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Eye, EyeOff, CheckSquare } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload = mode === 'login' ? { email: form.email, password: form.password } : form;
      const res = await api.post(endpoint, payload);
      // Migrate guest tasks
      const guestTasks = JSON.parse(localStorage.getItem('guestTasks') || '[]');
      if (guestTasks.length > 0) {
        await Promise.allSettled(guestTasks.map(t =>
          api.post('/tasks', { title: t.title, description: t.description, status: t.status, priority: t.priority, categories: t.categories, dueDate: t.dueDate },
            { headers: { Authorization: `Bearer ${res.data.token}` } })
        ));
        localStorage.removeItem('guestTasks');
      }
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/google', { credential: credentialResponse.credential });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch {
      setError('Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_google_client_id',
        callback: handleGoogle,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        { theme: 'outline', size: 'large', width: '100%', text: 'continue_with' }
      );
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight">TaskFlow</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-stone-200 dark:border-zinc-800 p-8">
          <h1 className="text-2xl font-bold mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
            {mode === 'login' ? "Sign in to your account" : "Start managing your tasks"}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  placeholder="Your name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-200 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="flex-1 h-px bg-stone-200 dark:bg-zinc-700" />
          </div>

          <div id="google-btn" className="flex justify-center" />

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <button
            onClick={() => navigate('/')}
            className="w-full text-center text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 mt-3 transition"
          >
            Continue as guest →
          </button>
        </div>
      </div>
    </div>
  );
}
