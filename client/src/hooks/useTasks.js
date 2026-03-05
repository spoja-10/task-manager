import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export function useTasks(filters = {}) {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/tasks', { params: { ...filters, ...params } });
      setTasks(res.data.data);
      setPagination(res.data.pagination);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const createTask = useCallback(async (data) => {
    const res = await api.post('/tasks', data);
    setTasks(prev => [res.data.data, ...prev]);
    return res.data.data;
  }, []);

  const updateTask = useCallback(async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    setTasks(prev => prev.map(t => t._id === id ? res.data.data : t));
    return res.data.data;
  }, []);

  const toggleTask = useCallback(async (id) => {
    const res = await api.patch(`/tasks/${id}/toggle`);
    setTasks(prev => prev.map(t => t._id === id ? res.data.data : t));
    return res.data.data;
  }, []);

  const deleteTask = useCallback(async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  }, []);

  const reorderTasks = useCallback(async (reorderedTasks) => {
    setTasks(reorderedTasks);
    try {
      await api.patch('/tasks/reorder', {
        tasks: reorderedTasks.map((t, i) => ({ id: t._id, order: i, status: t.status }))
      });
    } catch (e) {
      fetchTasks(); // revert on error
    }
  }, [fetchTasks]);

  return { tasks, setTasks, pagination, loading, error, fetchTasks, createTask, updateTask, toggleTask, deleteTask, reorderTasks };
}
