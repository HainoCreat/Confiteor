// src/pages/TaskDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { taskService } from '../../services/taskService';

type TaskStatus = "Обычная задача" | "Срочная задача" | "Экстренная задача";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  description?: string;
  created_at?: string;
}

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await taskService.getTaskById(parseInt(id));
        setTask(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка задачи...</div>;
  if (error) return <div style={{ color: '#dc3545', textAlign: 'center', padding: '50px' }}>Ошибка: {error}</div>;
  if (!task) return <div style={{ textAlign: 'center', padding: '50px' }}>Задача не найдена</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Link to="/tasks">
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            ← Назад к списку
          </button>
        </Link>
        <Link to={`/tasks/${task.id}/edit`}>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            ✏️ Редактировать
          </button>
        </Link>
      </div>

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '30px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            backgroundColor: task.status === "Обычная задача" ? '#28a745' : 
                           task.status === "Срочная задача" ? '#ffc107' : '#dc3545',
            color: 'white'
          }}>
            {task.status}
          </span>
        </div>

        <h1 style={{ marginBottom: '20px' }}>#{task.id} - {task.title}</h1>
        
        {task.description && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Описание:</h3>
            <p style={{ 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px',
              lineHeight: 1.6
            }}>
              {task.description}
            </p>
          </div>
        )}

        {task.created_at && (
          <div style={{ color: '#666', fontSize: '14px', marginTop: '20px' }}>
            Создано: {new Date(task.created_at).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}