import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="animate-scale">
        <div style={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="var(--accent)"/>
            <path d="M8 16.5l5 5 11-11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={styles.logoText}>Taskflow</span>
        </div>

        <h1 style={styles.heading}>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
        <p style={styles.sub}>{mode === 'login' ? 'Sign in to your workspace' : 'Start managing your tasks'}</p>

        <form onSubmit={submit} style={styles.form}>
          {mode === 'register' && (
            <Field label="Name" name="name" value={form.name} onChange={handle} placeholder="Your name" required />
          )}
          <Field label="Email" name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
          <Field label="Password" name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" required />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? <Spinner /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <p style={styles.toggle}>
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); }} style={styles.link}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-2)', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{label}</label>
      <input {...props} style={{
        background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
        padding: '10px 14px', color: 'var(--text)', fontSize: '0.95rem', width: '100%',
        outline: 'none', transition: 'border-color 0.15s',
      }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  );
}

function Spinner() {
  return <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />;
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'var(--bg)' },
  card: { background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 400 },
  logo: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 },
  logoText: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em' },
  heading: { fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 6 },
  sub: { color: 'var(--text-2)', fontSize: '0.9rem', marginBottom: 28 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  error: { background: 'var(--red-dim)', color: 'var(--red)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', border: '1px solid rgba(248,113,113,0.2)' },
  btn: { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', padding: '11px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'opacity 0.15s, transform 0.1s' },
  toggle: { textAlign: 'center', marginTop: 20, fontSize: '0.88rem', color: 'var(--text-2)' },
  link: { background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 500, fontSize: 'inherit', padding: 0 }
};
