import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, ArrowRight, CheckCircle2, Zap, Shield, Kanban, Search, Tag, Moon, Sun, ChevronDown, ChevronUp, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FEATURES = [
  { icon: Kanban, title: 'Kanban Board', desc: 'Visualize your workflow across To Do, In Progress, and Done — all in one glance.' },
  { icon: Zap, title: 'Guest Mode', desc: 'Jump straight in. No sign-up required. Your first 5 tasks are yours instantly.' },
  { icon: Search, title: 'Smart Filtering', desc: 'Search, filter by priority, category, and sort — find any task in under a second.' },
  { icon: Tag, title: 'Tags & Categories', desc: 'Label and group tasks your way. Build a system that fits your brain, not ours.' },
  { icon: Shield, title: 'Secure Auth', desc: 'Email/password or Google Sign-In. Your data is yours — always encrypted.' },
  { icon: Moon, title: 'Dark Mode', desc: "Built dark-first because that's how serious work gets done at 2am." },
];

const STEPS = [
  { n: '01', title: 'Open the app', desc: 'No sign-up wall. You land on the board immediately.' },
  { n: '02', title: 'Create a task', desc: 'Hit "New task", fill in details, assign priority and a due date.' },
  { n: '03', title: 'Move it forward', desc: 'Click the status icon to cycle: To Do → In Progress → Done.' },
  { n: '04', title: 'Save your work', desc: 'Sign in once to sync everything to the cloud.' },
];

const FAQS = [
  { q: 'Is TaskFlow really free?', a: 'Yes — completely. No hidden tiers, no credit card, no trial period. Every feature is available to every user.' },
  { q: 'What happens to my guest tasks when I sign in?', a: 'They migrate automatically. Every task you created as a guest will be waiting in your account.' },
  { q: 'Is there a limit on tasks?', a: 'Guest mode is capped at 5 tasks. Once you sign in, there is no limit.' },
  { q: 'Can I use Google to sign in?', a: "Yes. One click with your Google account and you're in — no new password needed." },
  { q: 'Where is my data stored?', a: 'Your tasks live in a secure MongoDB database. We never sell or share your data.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { dark, toggle } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);

  const goToApp = () => navigate('/app');
  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/register');

  return (
    <div className="min-h-screen bg-white dark:bg-ink-950 text-ink-900 dark:text-ink-100 font-sans overflow-x-hidden transition-colors duration-300">

      {/* Subtle top gradient accent */}
      <div className="pointer-events-none fixed top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent z-50" />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl z-0 opacity-[0.07] dark:opacity-[0.12]"
        style={{ background: 'radial-gradient(ellipse, #f59e0b 0%, transparent 70%)' }} />

      {/* ── NAV ── */}
      <nav className="relative z-40 sticky top-0 bg-white/90 dark:bg-ink-950/90 backdrop-blur-md border-b border-ink-100 dark:border-ink-800/60 transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="text-amber-500" size={20} />
            <span className="font-black text-lg tracking-tight">TaskFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-400 dark:text-ink-500">
            {['#features','#how-it-works','#pricing','#faq'].map((href, i) => (
              <a key={href} href={href} className="hover:text-amber-500 transition">
                {['Features','How it works','Pricing','FAQ'][i]}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800 transition">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={goToLogin} className="text-sm font-semibold text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 transition px-3 py-2">
              Sign in
            </button>
            <button onClick={goToLogin} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white dark:text-ink-950 text-sm font-bold rounded-lg transition shadow-sm shadow-amber-500/30">
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/40 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-8 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Free forever · No credit card
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.92] mb-6">
            Stop planning.<br />
            <span className="text-amber-500">Start doing.</span>
          </h1>
          <p className="text-lg text-ink-500 dark:text-ink-400 leading-relaxed max-w-lg mb-10">
            TaskFlow is the task manager that gets out of your way. Kanban boards, smart filters, guest mode — built for people who actually want to get things done.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={goToLogin} className="group flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-white dark:text-ink-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/25 text-sm">
              Get started for free
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button onClick={goToLogin} className="px-7 py-3.5 border-2 border-ink-200 dark:border-ink-700 hover:border-amber-400 dark:hover:border-amber-500 text-ink-600 dark:text-ink-300 hover:text-amber-600 dark:hover:text-amber-400 font-semibold rounded-xl transition text-sm">
              Sign in
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-5 mt-10 text-xs font-medium text-ink-400 dark:text-ink-500">
            {['No credit card', 'Guest mode', 'Open source'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-amber-500" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Mock kanban board */}
        <div className="mt-16 relative">
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-ink-950 to-transparent z-10 pointer-events-none" />
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl border border-ink-100 dark:border-ink-800 bg-ink-50/80 dark:bg-ink-900/60 shadow-xl shadow-ink-200/50 dark:shadow-none backdrop-blur">
            {[
              { col: 'To Do', dot: 'bg-ink-300 dark:bg-ink-600', badge: 'text-ink-500 dark:text-ink-400 bg-ink-100 dark:bg-ink-800', tasks: ['Design homepage', 'Write tests', 'Update docs'] },
              { col: 'In Progress', dot: 'bg-blue-400', badge: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30', tasks: ['Build Kanban board', 'Auth flow'] },
              { col: 'Done', dot: 'bg-green-400', badge: 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30', tasks: ['Setup Docker', 'MongoDB models', 'API routes', 'Dark mode'] },
            ].map(({ col, dot, badge, tasks }) => (
              <div key={col} className="bg-white dark:bg-ink-900 rounded-xl border border-ink-100 dark:border-ink-800 overflow-hidden">
                <div className="px-3 py-2.5 border-b border-ink-100 dark:border-ink-800 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span className="text-xs font-bold text-ink-700 dark:text-ink-300">{col}</span>
                  <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badge}`}>{tasks.length}</span>
                </div>
                <div className="p-2 space-y-1.5">
                  {tasks.map(t => (
                    <div key={t} className="px-2.5 py-2 bg-ink-50 dark:bg-ink-800/60 rounded-lg border border-ink-100 dark:border-ink-700/50">
                      <p className="text-xs text-ink-700 dark:text-ink-300 font-medium">{t}</p>
                      <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold">medium</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="mb-14">
          <p className="text-amber-500 text-xs font-black tracking-widest uppercase mb-3">Features</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Everything you need.<br />Nothing you don't.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group p-6 bg-ink-50 dark:bg-ink-900/50 border border-ink-100 dark:border-ink-800 rounded-2xl hover:border-amber-300 dark:hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/15 transition">
                <Icon size={18} className="text-amber-500" />
              </div>
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="relative z-10 bg-ink-50 dark:bg-ink-900/30 border-y border-ink-100 dark:border-ink-800/60 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="mb-14">
            <p className="text-amber-500 text-xs font-black tracking-widest uppercase mb-3">How it works</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Up and running<br />in 60 seconds.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(({ n, title, desc }, i) => (
              <div key={n} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-gradient-to-r from-ink-200 dark:from-ink-700 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center mb-4 shadow-md shadow-amber-500/30">
                    <span className="font-mono text-xs font-black text-white dark:text-ink-950">{n}</span>
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="mb-14 text-center">
          <p className="text-amber-500 text-xs font-black tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Free. Full stop.</h2>
          <p className="text-ink-500 max-w-md mx-auto text-sm">No tiers. No paywalls. No "pro" features. TaskFlow is free for everyone, forever.</p>
        </div>
        <div className="max-w-sm mx-auto">
          <div className="relative p-8 bg-white dark:bg-ink-900 border-2 border-amber-400 dark:border-amber-500/50 rounded-2xl text-center shadow-2xl shadow-amber-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white dark:text-ink-950 text-xs font-black rounded-full tracking-widest uppercase">
              The Only Plan
            </div>
            <div className="text-7xl font-black mt-3 mb-1">$0</div>
            <div className="text-ink-400 text-sm mb-8">forever & always</div>
            <ul className="space-y-3 text-sm text-left mb-8">
              {['Unlimited tasks','Kanban board','Smart filters & search','Tags & categories','Google Sign-In','Dark mode','Guest mode'].map(f => (
                <li key={f} className="flex items-center gap-3 text-ink-700 dark:text-ink-300">
                  <CheckCircle2 size={15} className="text-amber-500 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <button onClick={goToLogin} className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-white dark:text-ink-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/25">
              Get started for free
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative z-10 bg-ink-50 dark:bg-ink-900/30 border-t border-ink-100 dark:border-ink-800/60 transition-colors">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <div className="mb-14">
            <p className="text-amber-500 text-xs font-black tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Questions answered.</h2>
          </div>
          <div className="space-y-2">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="bg-white dark:bg-transparent border border-ink-100 dark:border-ink-800 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-ink-50 dark:hover:bg-ink-800/40 transition">
                  <span className="font-semibold text-sm">{q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-amber-500 shrink-0" /> : <ChevronDown size={16} className="text-ink-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-ink-500 leading-relaxed border-t border-ink-100 dark:border-ink-800">
                    <div className="pt-4">{a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-amber-500 px-10 py-14 text-center">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 0,transparent 50%)', backgroundSize: '10px 10px' }} />
          <h2 className="relative text-3xl md:text-4xl font-black tracking-tighter text-white mb-3">Ready to get things done?</h2>
          <p className="relative text-amber-100 mb-8 text-sm">No sign-up needed. Jump in with guest mode right now.</p>
          <button onClick={goToApp} className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-ink-50 text-amber-600 font-bold rounded-xl transition text-sm shadow-lg">
            Open TaskFlow <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-ink-100 dark:border-ink-800/60 max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-400">
        <div className="flex items-center gap-2">
          <CheckSquare size={13} className="text-amber-500" />
          <span className="font-bold">TaskFlow</span>
          <span className="text-ink-300 dark:text-ink-600">· Built with React, Node.js & MongoDB</span>
        </div>
        <div className="flex items-center gap-5">
          {['Privacy','Terms'].map(l => <a key={l} href="#" className="hover:text-amber-500 transition">{l}</a>)}
          <a href="#" className="hover:text-amber-500 transition flex items-center gap-1"><Github size={11} /> GitHub</a>
        </div>
      </footer>
    </div>
  );
}