import { Circle, Clock, CheckCircle2, Plus, ListTodo } from 'lucide-react';
import TaskCard from './TaskCard';

const COLUMNS = [
  {
    status: 'todo', label: 'To Do', icon: Circle,
    iconColor: 'text-ink-400 dark:text-ink-500',
    dot: 'bg-ink-300 dark:bg-ink-600',
    header: 'bg-ink-50 dark:bg-ink-800/50',
    border: 'border-ink-200 dark:border-ink-800',
    count: 'bg-ink-200 dark:bg-ink-700 text-ink-500 dark:text-ink-400',
  },
  {
    status: 'in-progress', label: 'In Progress', icon: Clock,
    iconColor: 'text-blue-500',
    dot: 'bg-blue-400',
    header: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-100 dark:border-blue-900/50',
    count: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    status: 'completed', label: 'Done', icon: CheckCircle2,
    iconColor: 'text-green-500',
    dot: 'bg-green-400',
    header: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-100 dark:border-green-900/50',
    count: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  },
];

export default function KanbanBoard({ tasks, onEdit, onNewTask, search }) {
  if (tasks.length === 0) return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-ink-100 dark:bg-ink-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
        <ListTodo className="text-ink-300 dark:text-ink-600" size={28} />
      </div>
      <p className="font-bold text-ink-500 dark:text-ink-400 mb-1">No tasks found</p>
      <p className="text-ink-400 dark:text-ink-600 text-sm mb-5">
        {search ? 'Try adjusting your search or filters' : 'Create your first task to get started'}
      </p>
      {!search && (
        <button onClick={onNewTask}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white dark:text-ink-950 font-bold rounded-xl transition text-sm shadow-md shadow-amber-500/20">
          Create task
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COLUMNS.map(({ status, label, icon: Icon, iconColor, dot, header, border, count }) => {
        const col = tasks.filter(t => t.status === status);
        return (
          <div key={status} className={`rounded-2xl border ${border} bg-white dark:bg-ink-900/40 flex flex-col shadow-sm`}>
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-3 rounded-t-2xl ${header} border-b ${border}`}>
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                <span className="text-sm font-black text-ink-700 dark:text-ink-200 tracking-tight">{label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${count}`}>{col.length}</span>
              </div>
              {status === 'todo' && (
                <button onClick={onNewTask}
                  className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-ink-200 dark:hover:bg-ink-700 text-ink-400 hover:text-amber-500 transition">
                  <Plus size={14} />
                </button>
              )}
            </div>

            {/* Cards */}
            <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[65vh] scrollbar-hide">
              {col.length === 0 ? (
                <div className="flex items-center justify-center h-20 rounded-xl border-2 border-dashed border-ink-100 dark:border-ink-800">
                  <p className="text-xs text-ink-300 dark:text-ink-700 font-medium">Drop tasks here</p>
                </div>
              ) : (
                col.map(task => <TaskCard key={task._id} task={task} onEdit={onEdit} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}