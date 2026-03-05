import { useState, useEffect } from 'react';
import { X, Plus, Tag } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = ['todo', 'in-progress', 'completed'];

export default function TaskModal({ task, onClose }) {
  const { createTask, updateTask } = useTasks();
  const [form, setForm] = useState({
    title: '', description: '', status: 'todo', priority: 'medium',
    categories: [], dueDate: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        categories: task.categories || [],
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : ''
      });
    }
  }, [task]);

  const addTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().replace(',', '');
      if (!form.categories.includes(tag)) {
        setForm(f => ({ ...f, categories: [...f.categories, tag] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tag) => setForm(f => ({ ...f, categories: f.categories.filter(t => t !== tag) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError('Title is required');
    setLoading(true); setError('');
    try {
      const data = { ...form, dueDate: form.dueDate || undefined };
      if (task) await updateTask(task._id, data);
      else await createTask(data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally { setLoading(false); }
  };

  const priorityColors = { low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
  const statusLabels = { 'todo': 'To Do', 'in-progress': 'In Progress', 'completed': 'Completed' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-ink-900 rounded-2xl border border-ink-100 dark:border-ink-800 shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-ink-100 dark:border-ink-800">
          <h2 className="font-bold text-lg text-ink-900 dark:text-ink-100">
            {task ? 'Edit task' : 'New task'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-ink-400 hover:text-ink-600 hover:bg-ink-100 dark:hover:bg-ink-800 transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">Title *</label>
            <input type="text" required
              className="w-full px-4 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">Description</label>
            <textarea rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Optional description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">Status</label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {STATUSES.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">Priority</label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">Due Date</label>
            <input type="date"
              className="w-full px-4 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">Tags</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.categories.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 text-xs rounded-full">
                  <Tag size={10} /> {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-ink-400 hover:text-red-500">×</button>
                </span>
              ))}
            </div>
            <input type="text"
              className="w-full px-4 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag}
              placeholder="Type tag and press Enter"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 font-medium rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition disabled:opacity-50">
              {loading ? 'Saving...' : task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
