import { useState, useEffect, useCallback } from 'react';
import { Plus, SlidersHorizontal, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import Navbar from '../components/Navbar';
import KanbanBoard from '../components/KanbanBoard';
import TaskModal from '../components/TaskModal';
import GuestBanner from '../components/GuestBanner';
import SignInPromptModal from '../components/SignInPromptModal';

const PRIORITIES = ['', 'high', 'medium', 'low'];

export default function Dashboard() {
  const { isGuest, user } = useAuth();
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
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const doneCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors">
      <Navbar search={search} setSearch={setSearch} />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-5">
        {isGuest && <GuestBanner />}

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-ink-900 dark:text-ink-100">
              {user ? `Hey, ${user.name.split(' ')[0]} 👋` : 'My Tasks'}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-ink-400 dark:text-ink-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-ink-300 dark:bg-ink-600" />{todoCount} to do</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" />{inProgressCount} in progress</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" />{doneCount} done</span>
            </div>
          </div>
          <button onClick={handleNewTask}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-white dark:text-ink-950 font-bold rounded-xl transition text-sm shadow-md shadow-amber-500/25">
            <Plus size={16} />
            New task
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <button onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition ${
              showFilters || filters.priority || filters.category
                ? 'border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                : 'border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 bg-white dark:bg-ink-900'
            }`}>
            <SlidersHorizontal size={14} />
            <span className="hidden sm:block">Filters</span>
            {(filters.priority || filters.category) && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
          </button>

          <select value={filters.sortBy} onChange={e => setFilter('sortBy', e.target.value)}
            className="px-3 py-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-600 dark:text-ink-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition">
            <option value="createdAt">Created</option>
            <option value="dueDate">Due date</option>
            <option value="priority">Priority</option>
          </select>

          <button onClick={() => setFilter('order', filters.order === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-500 dark:text-ink-400 text-sm hover:bg-ink-50 dark:hover:bg-ink-800 transition font-mono font-bold">
            {filters.order === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white dark:bg-ink-900 rounded-2xl border border-ink-100 dark:border-ink-800 p-5 flex flex-wrap gap-5 shadow-sm">
            <div>
              <label className="block text-xs font-black text-ink-400 dark:text-ink-500 mb-2.5 uppercase tracking-widest">Priority</label>
              <div className="flex gap-1.5">
                {PRIORITIES.map(p => (
                  <button key={p} onClick={() => setFilter('priority', p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                      filters.priority === p
                        ? 'bg-amber-500 text-white dark:text-ink-950 shadow-sm'
                        : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'
                    }`}>
                    {p || 'All'}
                  </button>
                ))}
              </div>
            </div>
            {allCategories.length > 0 && (
              <div>
                <label className="block text-xs font-black text-ink-400 dark:text-ink-500 mb-2.5 uppercase tracking-widest">Category</label>
                <div className="flex gap-1.5 flex-wrap">
                  {['', ...allCategories].map(cat => (
                    <button key={cat} onClick={() => setFilter('category', cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        filters.category === cat
                          ? 'bg-amber-500 text-white dark:text-ink-950'
                          : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'
                      }`}>
                      {cat || 'All'}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {(filters.priority || filters.category) && (
              <button onClick={() => setFilters(f => ({ ...f, priority: '', category: '' }))}
                className="self-end text-xs text-red-400 hover:text-red-500 font-semibold transition">
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Kanban */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-7 h-7 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
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