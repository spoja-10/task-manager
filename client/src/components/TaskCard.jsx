import { useState } from 'react';
import { Pencil, Trash2, Tag, Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { format, isPast, isToday } from 'date-fns';

const priorityConfig = {
  high: { label: 'High', class: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
  medium: { label: 'Med', class: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  low: { label: 'Low', class: 'text-green-600 bg-green-50 dark:bg-green-900/20' }
};

const statusConfig = {
  'todo': { icon: Circle, class: 'text-ink-400' },
  'in-progress': { icon: Clock, class: 'text-blue-500' },
  'completed': { icon: CheckCircle2, class: 'text-green-500' }
};

export default function TaskCard({ task, onEdit }) {
  const { updateTask, deleteTask } = useTasks();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const StatusIcon = statusConfig[task.status]?.icon || Circle;

  const cycleStatus = async () => {
    const cycle = { 'todo': 'in-progress', 'in-progress': 'completed', 'completed': 'todo' };
    await updateTask(task._id, { status: cycle[task.status] });
  };

  const handleDelete = async () => {
    if (!confirming) return setConfirming(true);
    setDeleting(true);
    await deleteTask(task._id);
  };

  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const dueSoon = dueDate && !task.status === 'completed' && (isToday(dueDate) || isPast(dueDate));

  return (
    <div className={`group bg-white dark:bg-ink-900 rounded-xl border transition-all duration-200 hover:shadow-md ${
      task.status === 'completed' 
        ? 'border-ink-100 dark:border-ink-800 opacity-60' 
        : 'border-ink-100 dark:border-ink-800 hover:border-amber-300 dark:hover:border-amber-700'
    }`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button onClick={cycleStatus} className={`mt-0.5 flex-shrink-0 transition hover:scale-110 ${statusConfig[task.status]?.class}`}>
            <StatusIcon size={18} />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`font-semibold text-sm leading-tight ${task.status === 'completed' ? 'line-through text-ink-400' : 'text-ink-900 dark:text-ink-100'}`}>
                {task.title}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => onEdit(task)}
                  className="p-1.5 rounded-lg text-ink-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition">
                  <Pencil size={13} />
                </button>
                {confirming ? (
                  <div className="flex items-center gap-1">
                    <button onClick={handleDelete} disabled={deleting}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                      {deleting ? '...' : 'Yes'}
                    </button>
                    <button onClick={() => setConfirming(false)}
                      className="px-2 py-1 text-xs border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 rounded-lg hover:bg-ink-50 dark:hover:bg-ink-800 transition">
                      No
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirming(true)}
                    className="p-1.5 rounded-lg text-ink-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>

            {task.description && (
              <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 line-clamp-2 leading-relaxed">
                {task.description}
              </p>
            )}

            <div className="flex items-center flex-wrap gap-2 mt-2.5">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityConfig[task.priority]?.class}`}>
                {priorityConfig[task.priority]?.label}
              </span>

              {dueDate && (
                <span className={`flex items-center gap-1 text-xs ${dueSoon ? 'text-red-500' : 'text-ink-400 dark:text-ink-500'}`}>
                  <Calendar size={11} />
                  {format(dueDate, 'MMM d')}
                </span>
              )}

              {task.categories?.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs text-ink-400 dark:text-ink-500">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
