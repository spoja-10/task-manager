import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Sun, Moon, Search, LogOut, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ search, setSearch }) {
  const { user, isGuest, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-ink-900/80 backdrop-blur-md border-b border-ink-100 dark:border-ink-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 mr-auto">
          <CheckSquare className="text-amber-500" size={22} />
          <span className="font-sans font-bold text-xl text-ink-900 dark:text-ink-100 tracking-tight">TaskFlow</span>
        </Link>

        {showSearch ? (
          <div className="flex-1 max-w-sm flex items-center gap-2">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input autoFocus
                className="w-full pl-8 pr-4 py-1.5 rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-sm text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Search tasks..." value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button onClick={() => { setShowSearch(false); setSearch(''); }}
              className="text-ink-400 hover:text-ink-600">
              <X size={16} />
            </button>
          </div>
        ) : (
          <button onClick={() => setShowSearch(true)}
            className="p-2 rounded-lg text-ink-500 hover:text-ink-700 dark:hover:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition">
            <Search size={18} />
          </button>
        )}

        <button onClick={toggle}
          className="p-2 rounded-lg text-ink-500 hover:text-ink-700 dark:hover:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {isGuest ? (
          <Link to="/login"
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold rounded-lg transition">
            Sign in
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-400">
              {user?.avatar ? (
                <img src={user.avatar} className="w-7 h-7 rounded-full" alt={user.name} />
              ) : (
                <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
              )}
              <span className="hidden sm:block font-medium">{user?.name}</span>
            </div>
            <button onClick={logout}
              className="p-2 rounded-lg text-ink-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
