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
        navigate(location.pathname, { replace: true, state: {} });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate, location.pathname]);

  const handleDelete = async (id: number, title: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Останавливаем всплытие, чтобы не открывать детали задачи
    
    if (window.confirm(`Вы уверены, что хотите удалить задачу "${title}"?`)) {
      try {
        setDeletingId(id);
        await taskService.deleteTask(id);
        await fetchTasks();
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

  const handleEdit = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Останавливаем всплытие
    navigate(`/tasks/${id}/edit`);
  };

  const handleCardClick = (id: number) => {
    navigate(`/tasks/${id}`);
  };

  const getStatusColor = (status: TaskStatus) => {
    switch(status) {
      case "Обычная задача": return { bg: '#28a745', color: 'white' };
      case "Срочная задача": return { bg: '#ffc107', color: '#333' };
      case "Экстренная задача": return { bg: '#dc3545', color: 'white' };
      default: return { bg: '#6c757d', color: 'white' };
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
      <Link to="/">
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
          {tasks.map((task) => {
            const statusStyle = getStatusColor(task.status);
            
            return (
              <div 
                key={task.id}
                onClick={() => handleCardClick(task.id)}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '15px'
                }}>
                  <h3 style={{ margin: 0, flex: 1, color: '#333' }}>
                    #{task.id} - {task.title}
                  </h3>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color,
                    marginLeft: '10px'
                  }}>
                    {task.status}
                  </span>
                </div>
                
                {task.description && (
                  <p style={{ 
                    color: '#666', 
                    marginBottom: '20px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {task.description.length > 100 
                      ? `${task.description.substring(0, 100)}...` 
                      : task.description}
                  </p>
                )}
                
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'flex-end'
                }}>
                  <button 
                    onClick={(e) => handleEdit(e, task.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                  >
                    ✏️ Редактировать
                  </button>
                  <button 
                    onClick={(e) => handleDelete(task.id, task.title, e)}
                    disabled={deletingId === task.id}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: deletingId === task.id ? 'not-allowed' : 'pointer',
                      opacity: deletingId === task.id ? 0.6 : 1,
                      fontSize: '14px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (!deletingId) e.currentTarget.style.backgroundColor = '#c82333';
                    }}
                    onMouseLeave={(e) => {
                      if (!deletingId) e.currentTarget.style.backgroundColor = '#dc3545';
                    }}
                  >
                    {deletingId === task.id ? 'Удаление...' : '🗑️ Удалить'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}