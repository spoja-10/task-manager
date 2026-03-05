import { useMemo } from 'react';

const STATUS_OPTIONS = ['', 'todo', 'in-progress', 'completed'];
const PRIORITY_OPTIONS = ['', 'low', 'medium', 'high'];
const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Newest' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
];

const label = (v, type) => {
  if (!v) return type === 'status' ? 'All Status' : type === 'priority' ? 'All Priority' : 'All Tags';
  return v.charAt(0).toUpperCase() + v.slice(1).replace('-', ' ');
};

export default function FilterBar({ filters, onChange, tasks }) {
  const allCategories = useMemo(() => {
    const cats = new Set();
    tasks.forEach(t => t.categories?.forEach(c => cats.add(c)));
    return ['', ...cats];
  }, [tasks]);

  const set = (key, val) => onChange(f => ({ ...f, [key]: val }));

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <select value={filters.status} onChange={e => set('status', e.target.value)}
        className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer">
        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{label(s, 'status')}</option>)}
      </select>

      <select value={filters.priority} onChange={e => set('priority', e.target.value)}
        className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer">
        {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{label(p, 'priority')}</option>)}
      </select>

      {allCategories.length > 1 && (
        <select value={filters.category} onChange={e => set('category', e.target.value)}
          className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer">
          {allCategories.map(c => <option key={c} value={c}>{label(c, 'category')}</option>)}
        </select>
      )}

      <select value={filters.sortBy} onChange={e => set('sortBy', e.target.value)}
        className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer ml-auto">
        {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>

      {(filters.status || filters.priority || filters.category) && (
        <button onClick={() => onChange(f => ({ ...f, status: '', priority: '', category: '' }))}
          className="px-3 py-2 rounded-xl text-sm text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium">
          Clear filters
        </button>
      )}
    </div>
  );
}
