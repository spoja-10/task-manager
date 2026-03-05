import TaskCard from './TaskCard';
import { ClipboardList } from 'lucide-react';

export default function TaskList({ tasks, loading, onEdit, onDelete, onStatusChange }) {
  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (tasks.length === 0) return (
    <div className="flex flex-col items-center justify-center py-24 text-zinc-400 dark:text-zinc-600">
      <ClipboardList className="w-14 h-14 mb-4 opacity-50" />
      <p className="text-lg font-semibold">No tasks yet</p>
      <p className="text-sm mt-1">Create your first task to get started</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
