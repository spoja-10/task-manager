import { useState, useEffect, useCallback } from 'react';
import { Plus, SlidersHorizontal, CheckCircle2, Clock, Circle, ListTodo } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import Navbar from '../components/Navbar';
import KanbanBoard from '../components/KanbanBoard';
import TaskModal from '../components/TaskModal';
import GuestBanner from '../components/GuestBanner';
import SignInPromptModal from '../components/SignInPromptModal';

const PRIORITIES = ['', 'high', 'medium', 'low'];

export default function Dashboard() {
  const { isGuest } = useAuth();
  const { tasks, loading, fetchTasks, guestTaskCount } = useTasks();

  const [filters, setFilters] = useState({ priority: '', category: '', sortBy: 'createdAt', order: 'desc' });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const load = useCallback(() => {
    fetchTasks({ ...filters, search });
  }, [filters, search, fetchTasks]);

  useEffect(() => { load(); }, [load]);

  const handleNewTask = () => {
    if (isGuest && guestTaskCount() >= 5) { setShowSignIn(true); return; }
    setEditTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => { setEditTask(task); setShowModal(true); };
  const handleModalClose = () => { setShowModal(false); setEditTask(null); load(); };
  const setFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  const allCategories = [...new Set(tasks.flatMap(t => t.categories || []))];

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors">
      <Navbar search={search} setSearch={setSearch} />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-5">
        {isGuest && <GuestBanner />}

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <button onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition ${
              showFilters || filters.priority || filters.category
                ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800'
            }`}>
            <SlidersHorizontal size={14} />
            <span className="hidden sm:block">Filters</span>
          </button>

          <select value={filters.sortBy} onChange={e => setFilter('sortBy', e.target.value)}
            className="px-3 py-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-600 dark:text-ink-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
            <option value="createdAt">Created</option>
            <option value="dueDate">Due date</option>
            <option value="priority">Priority</option>
          </select>

          <button onClick={() => setFilter('order', filters.order === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-600 dark:text-ink-400 text-sm hover:bg-ink-50 dark:hover:bg-ink-800 transition font-mono">
            {filters.order === 'asc' ? '↑' : '↓'}
          </button>

          <div className="flex-1" />

          <button onClick={handleNewTask}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition text-sm shadow-sm">
            <Plus size={16} />
            <span>New task</span>
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white dark:bg-ink-900 rounded-xl border border-ink-100 dark:border-ink-800 p-4 flex flex-wrap gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 dark:text-ink-400 mb-2">Priority</label>
              <div className="flex gap-1.5">
                {PRIORITIES.map(p => (
                  <button key={p} onClick={() => setFilter('priority', p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
                      filters.priority === p ? 'bg-amber-500 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'
                    }`}>
                    {p || 'All'}
                  </button>
                ))}
              </div>
            </div>
            {allCategories.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-ink-500 dark:text-ink-400 mb-2">Category</label>
                <div className="flex gap-1.5 flex-wrap">
                  <button onClick={() => setFilter('category', '')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${!filters.category ? 'bg-amber-500 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'}`}>
                    All
                  </button>
                  {allCategories.map(cat => (
                    <button key={cat} onClick={() => setFilter('category', cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filters.category === cat ? 'bg-amber-500 text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {(filters.priority || filters.category) && (
              <button onClick={() => setFilters(f => ({ ...f, priority: '', category: '' }))}
                className="self-end px-3 py-1.5 text-xs text-red-500 hover:text-red-600 font-medium transition">
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Kanban Board */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <KanbanBoard tasks={tasks} onEdit={handleEdit} onNewTask={handleNewTask} search={search} />
        )}
      </main>

      {showModal && <TaskModal task={editTask} onClose={handleModalClose} />}
      {showSignIn && <SignInPromptModal onClose={() => setShowSignIn(false)} />}
    </div>
  );
}