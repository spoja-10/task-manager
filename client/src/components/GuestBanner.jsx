import { Link } from 'react-router-dom';
import { CloudOff } from 'lucide-react';

export default function GuestBanner() {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 flex items-center justify-between gap-4 text-sm">
      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
        <CloudOff size={15} />
        <span>You're in guest mode — tasks are saved locally only</span>
      </div>
      <Link to="/login"
        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-semibold rounded-lg transition whitespace-nowrap">
        Save to cloud
      </Link>
    </div>
  );
}
