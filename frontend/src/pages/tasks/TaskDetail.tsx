import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

type TaskStatus = "Обычная задача" | "Срочная задача" | "Экстренная задача";

interface TaskDetail {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    is_active: boolean;
    created_at: string; 
  }

  export default function TaskDetail() {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<TaskDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (!id) return;
      fetch(`http://127.0.0.1:5000/tasks/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Задача не найдена');
          return res.json();
        })
        .then(data => {
          setTask(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!task) return <div>Нет данных</div>;
  
    return (
      <div>
        <Link to="/tasks">← Назад к списку</Link>
        <h1>{task.title}</h1>
        <p><strong>Описание:</strong> {task.description}</p>
        <p><strong>Статус:</strong> {task.status}</p>
        <p><strong>Активна:</strong> {task.is_active ? 'Да' : 'Нет'}</p>
        <p><strong>Создана:</strong> {new Date(task.created_at).toLocaleString()}</p>
      </div>
    );
  }