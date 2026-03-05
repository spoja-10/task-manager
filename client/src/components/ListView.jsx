import { useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

export default function ListView({ tasks, onCreate, onUpdate, onToggle, onDelete }) {
  const [editTask, setEditTask] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div style={s.container}>
      <div style={s.list}>
        {tasks.length === 0 ? (
          <div style={s.empty}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 12, opacity: 0.3 }}>
              <rect x="8" y="12" width="32" height="4" rx="2" fill="currentColor"/>
              <rect x="8" y="22" width="24" height="4" rx="2" fill="currentColor"/>
              <rect x="8" y="32" width="28" height="4" rx="2" fill="currentColor"/>
            </svg>
            <p style={{ color: 'var(--text-2)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.1rem' }}>No tasks yet</p>
            <p style={{ color: 'var(--text-3)', fontSize: '0.85rem', marginTop: 4 }}>Create your first task to get started</p>
            <button onClick={() => setShowCreate(true)} style={s.createBtn}>New Task</button>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task._id} task={task} onToggle={onToggle} onEdit={setEditTask} onDelete={onDelete} />
          ))
        )}
      </div>

      {(editTask || showCreate) && (
        <TaskModal
          task={editTask}
          onSave={editTask ? (data) => onUpdate(editTask._id, data) : onCreate}
          onClose={() => { setEditTask(null); setShowCreate(false); }}
        />
      )}
    </div>
  );
}

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: 0 },
  list: { display: 'flex', flexDirection: 'column', gap: 8 },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', color: 'var(--text-3)', textAlign: 'center' },
  createBtn: { marginTop: 16, background: 'var(--accent)', border: 'none', color: '#fff', borderRadius: 8, padding: '9px 20px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }
};
