import { useNavigate } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';

export default function SignInPrompt({ onClose }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-stone-200 dark:border-zinc-800 text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-stone-100 dark:hover:bg-zinc-800 transition">
          <X className="w-4 h-4 text-zinc-400" />
        </button>
        <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-7 h-7 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">You've hit the guest limit!</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
          Sign in to create unlimited tasks, sync across devices, and never lose your data.
        </p>
        <button onClick={() => navigate('/auth')}
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition mb-3">
          Sign in or Create account
        </button>
        <button onClick={onClose}
          className="w-full py-3 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition">
          Continue as guest
        </button>
      </div>
    </div>
  );
}
