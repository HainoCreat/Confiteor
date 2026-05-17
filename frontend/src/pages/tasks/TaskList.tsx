// src/components/TaskList.tsx
import React from 'react';
import { useEffect, useState } from 'react';

type TaskStatus = "Обычная задача" | "Срочная задача" | "Экстренная задача";

interface Task {
  title: string;
  status: TaskStatus;
}

interface TasksResponse {
  tasks: Task[];
  total: number;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async (skip = 0, limit = 100) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:5000/tasks/?page_skip=${skip}&page_limit=${limit}`);
      if (!res.ok) throw new Error('Ошибка загрузки');
      const data: TasksResponse = await res.json();
      setTasks(data.tasks);
      setTotal(data.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div>Загрузка задач...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h2>Список задач (всего: {total})</h2>
      <ul>
        {tasks.map((task, idx) => (
          <li key={idx}>
            <strong>{task.title}</strong> — статус: {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}