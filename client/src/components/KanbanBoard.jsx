import { useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: 'var(--text-3)', accent: 'var(--blue)', bg: 'var(--blue-dim)' },
  { id: 'in-progress', label: 'In Progress', color: 'var(--amber)', accent: 'var(--amber)', bg: 'var(--amber-dim)' },
  { id: 'done', label: 'Done', color: 'var(--green)', accent: 'var(--green)', bg: 'var(--green-dim)' }
];

export default function KanbanBoard({ tasks, onCreate, onUpdate, onToggle, onDelete }) {
  const [editTask, setEditTask] = useState(null);
  const [createStatus, setCreateStatus] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [dragging, setDragging] = useState(null);

  const byStatus = (status) => tasks.filter(t => t.status === status).sort((a, b) => a.order - b.order);

  const handleDragStart = (e, task) => {
    setDragging(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();
    setDragOver(null);
    if (!dragging || dragging.status === status) { setDragging(null); return; }
    try { await onUpdate(dragging._id, { ...dragging, status }); }
    finally { setDragging(null); }
  };

  return (
    <div style={s.board}>
      {COLUMNS.map(col => {
        const colTasks = byStatus(col.id);
        return (
          <div key={col.id} style={{ ...s.column, borderTopColor: col.accent, background: dragOver === col.id ? 'var(--bg-3)' : 'var(--bg-2)' }}
            onDragOver={e => { e.preventDefault(); setDragOver(col.id); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={e => handleDrop(e, col.id)}
          >
            <div style={s.colHeader}>
              <div style={s.colTitle}>
                <span style={{ ...s.colDot, background: col.accent }} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '-0.01em' }}>{col.label}</span>
                <span style={{ ...s.colCount, background: col.bg, color: col.accent }}>{colTasks.length}</span>
              </div>
              <button onClick={() => setCreateStatus(col.id)} style={s.addBtn} title={`Add to ${col.label}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>

            <div style={s.cards}>
              {colTasks.map(task => (
                <div key={task._id} draggable onDragStart={e => handleDragStart(e, task)} onDragEnd={() => setDragging(null)} style={{ opacity: dragging?._id === task._id ? 0.4 : 1, transition: 'opacity 0.15s' }}>
                  <TaskCard task={task} onToggle={onToggle} onEdit={setEditTask} onDelete={onDelete} />
                </div>
              ))}

              {colTasks.length === 0 && (
                <div style={s.empty} onClick={() => setCreateStatus(col.id)}>
                  <span>Drop tasks here</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {(editTask || createStatus) && (
        <TaskModal
          task={editTask}
          defaultStatus={createStatus}
          onSave={editTask ? (data) => onUpdate(editTask._id, data) : onCreate}
          onClose={() => { setEditTask(null); setCreateStatus(null); }}
        />
      )}
    </div>
  );
}

const s = {
  board: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, height: 'calc(100vh - 200px)', alignItems: 'start' },
  column: { background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 12, borderTop: '3px solid', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'background 0.15s', maxHeight: 'calc(100vh - 200px)' },
  colHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 14px 10px', borderBottom: '1px solid var(--border)', flexShrink: 0 },
  colTitle: { display: 'flex', alignItems: 'center', gap: 8 },
  colDot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  colCount: { fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10, fontFamily: 'var(--font-mono)' },
  addBtn: { background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex', transition: 'color 0.15s, background 0.15s' },
  cards: { padding: 10, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', flex: 1 },
  empty: { border: '2px dashed var(--border)', borderRadius: 8, padding: '20px', textAlign: 'center', color: 'var(--text-3)', fontSize: '0.8rem', cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s' }
};
