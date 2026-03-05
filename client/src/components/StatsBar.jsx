export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const overdue = tasks.filter(t => t.isOverdue || (t.dueDate && t.status !== 'done' && new Date(t.dueDate) < new Date())).length;
  const high = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const stats = [
    { label: 'Total', value: total, color: 'var(--text-2)' },
    { label: 'Done', value: done, color: 'var(--green)' },
    { label: 'Overdue', value: overdue, color: 'var(--red)' },
    { label: 'High Priority', value: high, color: 'var(--amber)' },
  ];

  return (
    <div style={s.container}>
      <div style={s.stats}>
        {stats.map(({ label, value, color }) => (
          <div key={label} style={s.stat}>
            <span style={{ ...s.val, color }}>{value}</span>
            <span style={s.label}>{label}</span>
          </div>
        ))}
      </div>

      {total > 0 && (
        <div style={s.progressWrap}>
          <div style={s.progressBar}>
            <div style={{ ...s.progressFill, width: `${pct}%` }} />
          </div>
          <span style={s.pct}>{pct}%</span>
        </div>
      )}
    </div>
  );
}

const s = {
  container: { display: 'flex', alignItems: 'center', gap: 20, padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10 },
  stats: { display: 'flex', gap: 20, flex: 1 },
  stat: { display: 'flex', alignItems: 'baseline', gap: 6 },
  val: { fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '1.1rem' },
  label: { fontSize: '0.78rem', color: 'var(--text-3)' },
  progressWrap: { display: 'flex', alignItems: 'center', gap: 8, minWidth: 140 },
  progressBar: { flex: 1, height: 6, background: 'var(--bg-4)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--green))', borderRadius: 3, transition: 'width 0.5s ease' },
  pct: { fontSize: '0.78rem', color: 'var(--text-2)', fontFamily: 'var(--font-mono)', minWidth: 32, textAlign: 'right' }
};
