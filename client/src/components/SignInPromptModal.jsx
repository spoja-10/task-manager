import { Link } from 'react-router-dom';
import { X, Cloud, Shield, Zap } from 'lucide-react';

export default function SignInPromptModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-ink-900 rounded-2xl border border-ink-100 dark:border-ink-800 shadow-xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-ink-400 hover:text-ink-600">
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Cloud className="text-amber-500" size={28} />
          </div>
          <h2 className="font-bold text-xl text-ink-900 dark:text-ink-100 mb-2">Save your tasks</h2>
          <p className="text-ink-500 dark:text-ink-400 text-sm">You've created 5 tasks as a guest. Sign in to keep them safe and sync across devices.</p>
        </div>

        <div className="space-y-2 mb-6">
          {[
            { icon: Cloud, text: 'Sync across all devices' },
            { icon: Shield, text: 'Never lose your tasks' },
            { icon: Zap, text: 'Faster access, always' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm text-ink-600 dark:text-ink-400">
              <div className="w-7 h-7 bg-ink-100 dark:bg-ink-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={13} className="text-amber-500" />
              </div>
              {text}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Link to="/register" onClick={onClose}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl text-center transition text-sm">
            Create free account
          </Link>
          <Link to="/login" onClick={onClose}
            className="w-full py-2.5 border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 font-medium rounded-xl text-center hover:bg-ink-50 dark:hover:bg-ink-800 transition text-sm">
            Sign in
          </Link>
          <button onClick={onClose} className="text-xs text-ink-400 hover:text-ink-600 text-center mt-1">
            Continue as guest
          </button>
        </div>
      </div>
    </div>
  );
}
