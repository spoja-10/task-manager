import { useState } from 'react';
import { Pencil, Trash2, Tag, Calendar, CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { format, isPast, isToday } from 'date-fns';

const priorityConfig = {
  high: { label: 'High', class: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50' },
  medium: { label: 'Med', class: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50' },
  low: { label: 'Low', class: 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50' },
};

const statusConfig = {
  'todo': { icon: Circle, class: 'text-ink-300 dark:text-ink-600 hover:text-amber-500' },
  'in-progress': { icon: Clock, class: 'text-blue-400 hover:text-blue-500' },
  'completed': { icon: CheckCircle2, class: 'text-green-500 hover:text-green-400' },
};

export default function TaskCard({ task, onEdit }) {
  const { updateTask, deleteTask } = useTasks();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { icon: StatusIcon, class: statusClass } = statusConfig[task.status] || statusConfig['todo'];

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
  const isOverdue = dueDate && task.status !== 'completed' && isPast(dueDate) && !isToday(dueDate);
  const isDueToday = dueDate && isToday(dueDate) && task.status !== 'completed';

  return (
    <div className={`group relative bg-white dark:bg-ink-900 rounded-xl border transition-all duration-200 hover:shadow-md ${
      task.status === 'completed'
        ? 'border-ink-100 dark:border-ink-800/50 opacity-60'
        : isOverdue
          ? 'border-red-200 dark:border-red-900/50 hover:border-red-300 dark:hover:border-red-800'
          : 'border-ink-100 dark:border-ink-800 hover:border-amber-300 dark:hover:border-amber-700/50'
    }`}>
      {/* Overdue indicator */}
      {isOverdue && <div className="absolute top-0 left-0 w-1 h-full bg-red-400 rounded-l-xl" />}
      {isDueToday && <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 rounded-l-xl" />}

      <div className="p-3.5 pl-4">
        <div className="flex items-start gap-2.5">
          {/* Status toggle */}
          <button onClick={cycleStatus} title="Click to advance status"
            className={`mt-0.5 flex-shrink-0 transition-all hover:scale-110 ${statusClass}`}>
            <StatusIcon size={17} />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`font-semibold text-sm leading-snug ${
                task.status === 'completed' ? 'line-through text-ink-400 dark:text-ink-600' : 'text-ink-900 dark:text-ink-100'
              }`}>
                {task.title}
              </h3>

              {/* Actions */}
              <div className={`flex items-center gap-0.5 flex-shrink-0 transition-opacity ${confirming ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {!confirming && (
                  <button onClick={() => onEdit(task)}
                    className="p-1.5 rounded-lg text-ink-300 dark:text-ink-600 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition">
                    <Pencil size={12} />
                  </button>
                )}
                {confirming ? (
                  <div className="flex items-center gap-1">
                    <button onClick={handleDelete} disabled={deleting}
                      className="px-2 py-1 text-[11px] font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                      {deleting ? '...' : 'Delete'}
                    </button>
                    <button onClick={() => setConfirming(false)}
                      className="px-2 py-1 text-[11px] font-bold border border-ink-200 dark:border-ink-700 text-ink-500 rounded-lg hover:bg-ink-50 dark:hover:bg-ink-800 transition">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirming(true)}
                    className="p-1.5 rounded-lg text-ink-300 dark:text-ink-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>

            {task.description && (
              <p className="text-xs text-ink-400 dark:text-ink-500 mt-1 line-clamp-2 leading-relaxed">
                {task.description}
              </p>
            )}

            <div className="flex items-center flex-wrap gap-1.5 mt-2.5">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${priorityConfig[task.priority]?.class}`}>
                {priorityConfig[task.priority]?.label}
              </span>

              {dueDate && (
                <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isOverdue
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50'
                    : isDueToday
                      ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50'
                      : 'text-ink-400 dark:text-ink-500'
                }`}>
                  {isOverdue ? <AlertCircle size={10} /> : <Calendar size={10} />}
                  {isOverdue ? 'Overdue' : isDueToday ? 'Today' : format(dueDate, 'MMM d')}
                </span>
              )}

              {task.categories?.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-[11px] text-ink-400 dark:text-ink-500 bg-ink-50 dark:bg-ink-800 px-2 py-0.5 rounded-full border border-ink-100 dark:border-ink-700">
                  <Tag size={9} />{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}