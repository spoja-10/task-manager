import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { Eye, EyeOff, CheckSquare } from 'lucide-react';

export default function Register() {
  const { register, googleAuth, user } = useAuth();
  const { migrateGuestTasks, guestTaskCount } = useTasks();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (user) navigate('/'); }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setError(''); setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      if (guestTaskCount() > 0) await migrateGuestTasks();
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckSquare className="text-amber-500" size={32} />
            <span className="font-sans font-800 text-3xl text-ink-900 dark:text-ink-100 tracking-tight">TaskFlow</span>
          </div>
          <p className="text-ink-500 dark:text-ink-400 font-mono text-sm">Create your account</p>
        </div>

        <div className="bg-white dark:bg-ink-900 rounded-2xl border border-ink-100 dark:border-ink-800 p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">Name</label>
              <input type="text" required
                className="w-full px-4 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">Email</label>
              <input type="email" required
                className="w-full px-4 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required
                  className="w-full px-4 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition pr-10"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min 6 characters"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-ink-200 dark:bg-ink-700" />
            <span className="text-xs text-ink-400 font-mono">or</span>
            <div className="flex-1 h-px bg-ink-200 dark:bg-ink-700" />
          </div>

          <div id="google-btn" className="flex justify-center">
            <div className="w-full py-2.5 border border-ink-200 dark:border-ink-700 rounded-xl text-center text-sm text-ink-500 dark:text-ink-400 font-mono">
              Google Sign-In (add VITE_GOOGLE_CLIENT_ID to enable)
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-500 hover:text-amber-400 font-semibold">Sign in</Link>
          </p>
          <p className="mt-2 text-center text-sm">
            <Link to="/" className="text-ink-400 hover:text-ink-600 dark:hover:text-ink-300 text-xs font-mono underline underline-offset-2">
              Continue as guest →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
