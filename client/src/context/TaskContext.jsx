import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const TaskContext = createContext();
const GUEST_KEY = 'guest_tasks';

export function TaskProvider({ children }) {
  const { isGuest } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGuestTasks = () => JSON.parse(localStorage.getItem(GUEST_KEY) || '[]');
  const saveGuestTasks = (t) => localStorage.setItem(GUEST_KEY, JSON.stringify(t));

  const fetchTasks = useCallback(async (filters = {}) => {
    if (isGuest) {
      let t = getGuestTasks();
      if (filters.status) t = t.filter(x => x.status === filters.status);
      if (filters.priority) t = t.filter(x => x.priority === filters.priority);
      if (filters.category) t = t.filter(x => x.categories?.includes(filters.category));
      if (filters.search) {
        const s = filters.search.toLowerCase();
        t = t.filter(x => x.title.toLowerCase().includes(s) || x.description?.toLowerCase().includes(s));
      }
      setTasks(t);
      return t;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => v && params.append(k, v));
      const res = await api.get(`/tasks?${params}`);
      setTasks(res.data.tasks);
      return res.data.tasks;
    } finally {
      setLoading(false);
    }
  }, [isGuest]);

  const createTask = async (data) => {
    if (isGuest) {
      const t = { ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() };
      const all = [...getGuestTasks(), t];
      saveGuestTasks(all);
      setTasks(prev => [...prev, t]);
      return t;
    }
    const res = await api.post('/tasks', data);
    setTasks(prev => [res.data.task, ...prev]);
    return res.data.task;
  };

  const updateTask = async (id, data) => {
    if (isGuest) {
      const all = getGuestTasks().map(t => t._id === id ? { ...t, ...data } : t);
      saveGuestTasks(all);
      setTasks(prev => prev.map(t => t._id === id ? { ...t, ...data } : t));
      return;
    }
    const res = await api.put(`/tasks/${id}`, data);
    setTasks(prev => prev.map(t => t._id === id ? res.data.task : t));
  };

  const deleteTask = async (id) => {
    if (isGuest) {
      const all = getGuestTasks().filter(t => t._id !== id);
      saveGuestTasks(all);
      setTasks(prev => prev.filter(t => t._id !== id));
      return;
    }
    await api.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  const migrateGuestTasks = async () => {
    const guestTasks = getGuestTasks();
    for (const t of guestTasks) {
      const { _id, createdAt, ...data } = t;
      await api.post('/tasks', data).catch(() => {});
    }
    localStorage.removeItem(GUEST_KEY);
  };

  const guestTaskCount = () => getGuestTasks().length;

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, createTask, updateTask, deleteTask, migrateGuestTasks, guestTaskCount }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
