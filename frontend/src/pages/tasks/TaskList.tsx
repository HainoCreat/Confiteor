import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { taskService } from '../../services/taskService';

type TaskStatus = "Обычная задача" | "Срочная задача" | "Экстренная задача";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  description?: string; 
  created_at?: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const fetchTasks = async (skip = 0, limit = 100) => {
    setLoading(true);
    try {
      const data = await taskService.getTasks(skip, limit);
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

  // Автоматически скрываем сообщение через 3 секунды
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        // Очищаем сообщение в состоянии (через navigate с replace)
        navigate(location.pathname, { replace: true, state: {} });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate, location.pathname]);

  const handleDelete = async (id: number, title: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить задачу "${title}"?`)) {
      try {
        setDeletingId(id);
        await taskService.deleteTask(id);
        // Обновляем список
        await fetchTasks();
        // Показываем сообщение об успехе
        navigate(location.pathname, { 
          state: { message: `Задача "${title}" успешно удалена!` }
        });
      } catch (err: any) {
        setError(err.message);
        setTimeout(() => setError(''), 3000);
      } finally {
        setDeletingId(null);
      }
    }
  };


  if (loading) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <div>Загрузка задач...</div>
    </div>
  );
  
  if (error) return (
    <div style={{ color: '#dc3545', textAlign: 'center', padding: '50px' }}>
      Ошибка: {error}
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Кнопка "На главную" */}
      <Link to={`/`}>
        <button style={{
          marginBottom: '20px',
          padding: '8px 16px',
          fontSize: '14px',
          cursor: 'pointer',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          ← На главную
        </button>
      </Link>

      {/* Заголовок и кнопка создания */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2>Список задач (всего: {total})</h2>
        <Link to="/tasks/create">
          <button style={{
            padding: '10px 20px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}>
            + Создать задачу
          </button>
        </Link>
      </div>

      {/* Сообщение об успехе */}
      {successMessage && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #c3e6cb'
        }}>
          ✅ {successMessage}
        </div>
      )}

      {/* Список задач в виде карточек */}
      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p>У вас пока нет задач</p>
          <Link to="/tasks/create">
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Создать первую задачу
            </button>
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {tasks.map((task) => (
            <div key={task.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '15px'
              }}>
                <h3 style={{ margin: 0, flex: 1 }}>
                  #{task.id} - {task.title}
                </h3>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: task.status === "Обычная задача" ? 'white' : '#333'
                }}>
                  {task.status}
                </span>
              </div>
              
              {task.description && (
                <p style={{ color: '#666', marginBottom: '20px' }}>
                  {task.description}
                </p>
              )}
              
              <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end'
              }}>
                <Link to={`/tasks/${task.id}/edit`}>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    ✏️ Редактировать
                  </button>
                </Link>
                <button 
                  onClick={() => handleDelete(task.id, task.title)}
                  disabled={deletingId === task.id}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: deletingId === task.id ? 'not-allowed' : 'pointer',
                    opacity: deletingId === task.id ? 0.6 : 1
                  }}
                >
                  {deletingId === task.id ? 'Удаление...' : '🗑️ Удалить'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}