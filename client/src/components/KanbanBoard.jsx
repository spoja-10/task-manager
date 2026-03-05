import { Circle, Clock, CheckCircle2, Plus, ListTodo } from 'lucide-react';
import TaskCard from './TaskCard';

const COLUMNS = [
  { status: 'todo', label: 'To Do', icon: Circle, color: 'text-ink-400', bg: 'bg-ink-100 dark:bg-ink-800', border: 'border-ink-200 dark:border-ink-700' },
  { status: 'in-progress', label: 'In Progress', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
  { status: 'completed', label: 'Done', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' },
];

export default function KanbanBoard({ tasks, onEdit, onNewTask, search }) {
  const noTasks = tasks.length === 0;

  if (noTasks) return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-ink-100 dark:bg-ink-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <ListTodo className="text-ink-400" size={28} />
      </div>
      <p className="text-ink-500 dark:text-ink-400 font-medium mb-1">No tasks found</p>
      <p className="text-ink-400 dark:text-ink-500 text-sm mb-4">
        {search ? 'Try adjusting your search or filters' : 'Create your first task to get started'}
      </p>
      {!search && (
        <button onClick={onNewTask}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition text-sm">
          Create task
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COLUMNS.map(({ status, label, icon: Icon, color, bg, border }) => {
        const col = tasks.filter(t => t.status === status);
        return (
          <div key={status} className={`rounded-2xl border ${border} bg-white/50 dark:bg-ink-900/50 flex flex-col min-h-[200px]`}>
            {/* Column header */}
            <div className={`flex items-center justify-between px-4 py-3 rounded-t-2xl ${bg}`}>
              <div className="flex items-center gap-2">
                <Icon size={15} className={color} />
                <span className="text-sm font-semibold text-ink-700 dark:text-ink-300">{label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bg} ${color}`}>
                  {col.length}
                </span>
              </div>
              {status === 'todo' && (
                <button onClick={onNewTask}
                  className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-ink-200 dark:hover:bg-ink-700 text-ink-400 hover:text-ink-600 dark:hover:text-ink-200 transition">
                  <Plus size={14} />
                </button>
              )}
            </div>

            {/* Cards */}
            <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[70vh] scrollbar-hide">
              {col.length === 0 ? (
                <div className="flex items-center justify-center h-16 text-ink-300 dark:text-ink-600 text-xs">
                  No tasks
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