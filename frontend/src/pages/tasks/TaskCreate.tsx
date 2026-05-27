import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Типы данных
enum TaskStatus {
  NORMAL = "Обычная задача",
  MIDDLE = "Срочная задача",
  HARD = "Экстренная задача"
}

interface TaskCreate {
  title: string;
  description: string;
  is_active: boolean;
  status: TaskStatus;
}

const TaskCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<TaskCreate>({
    title: '',
    description: '',
    is_active: true,
    status: TaskStatus.NORMAL
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('Название задачи обязательно');
      return false;
    }
    if (formData.title.length < 3) {
      setError('Название должно содержать минимум 3 символа');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Описание задачи обязательно');
      return false;
    }
    if (formData.description.length < 10) {
      setError('Описание должно содержать минимум 10 символов');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/tasks/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Полный ответ от сервера:', response);
      console.log('Данные ответа:', response.data);
      console.log('ID задачи:', response.data.id);

      console.log('Задача создана:', response.data);
      
      let taskId = response.data.id;
      
      if (!taskId && response.data.task_id) {
        taskId = response.data.task_id;
      }
      if (!taskId && response.data._id) {
        taskId = response.data._id;
      }
      
      if (taskId) {
        console.log('Перенаправление на задачу с ID:', taskId);
        navigate(`/tasks/${taskId}`);
      } else {
        console.error('ID не найден в ответе:', response.data);
        navigate('/');
      }
      
    } catch (err: any) {
      console.error('Ошибка при создании задачи:', err);
      
      if (err.response) {
        setError(err.response.data.detail || 'Ошибка сервера');
      } else if (err.request) {
        setError('Нет соединения с сервером');
      } else {
        setError('Произошла ошибка при создании задачи');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleDebugSubmit = () => {
    console.log('Отправляемые данные:', formData);
  };

  return (
    <div className="create-task-container">
      {/* Инлайн-стили внутри компонента */}
      <style>{`
        .create-task-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, sans-serif;
        }

        .task-card {
          background:rgb(201, 188, 255);
          border-radius: 32px;
          box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.02);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .task-card:hover {
          box-shadow: 0 24px 42px -16px rgba(0, 0, 0, 0.12);
        }

        .card-header {
          padding: 1.75rem 2rem 0.5rem 2rem;
          border-bottom: 1px solidrgb(4, 97, 236);
        }

        .card-header h1 {
          font-size: 1.875rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e293b 0%, #2d3a4f 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          letter-spacing: -0.02em;
          margin: 0 0 0.25rem 0;
        }

        .card-header p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }

        .form-content {
          padding: 2rem;
        }

        .error-alert {
          background: #fef2f2;
          border-left: 4px solid #ef4444;
          border-radius: 16px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: #b91c1c;
          animation: slideIn 0.2s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-group {
          margin-bottom: 1.75rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .required-star {
          color: #ef4444;
          font-size: 1rem;
          margin-left: 2px;
        }

        input, textarea, select {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          font-family: inherit;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          color: #0f172a;
        }

        input:focus, textarea:focus, select:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        input:hover:not(:disabled), textarea:hover:not(:disabled), select:hover:not(:disabled) {
          border-color: #cbd5e1;
        }

        textarea {
          resize: vertical;
          min-height: 110px;
        }

        .hint-text {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Custom select styling */
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
          background-position: right 1rem center;
          background-repeat: no-repeat;
          background-size: 1.25rem;
          padding-right: 2.5rem;
        }

        /* Checkbox styling */
        .checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
        }

        .checkbox-wrapper input[type="checkbox"] {
          width: 1.2rem;
          height: 1.2rem;
          margin: 0;
          border-radius: 6px;
          cursor: pointer;
          accent-color: #6366f1;
        }

        .checkbox-wrapper label {
          margin: 0;
          cursor: pointer;
          font-weight: 500;
          color: #334155;
        }

        /* Priority badges preview */
        .priority-badge {
          display: inline-block;
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 30px;
          background: #f1f5f9;
          color: #475569;
        }

        /* Button group */
        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-primary {
          flex: 1;
          background: linear-gradient(105deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          padding: 0.85rem 1.5rem;
          border-radius: 40px;
          font-weight: 600;
          font-size: 0.95rem;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 2px 6px rgba(99, 102, 241, 0.2);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
          background: linear-gradient(105deg, #5b5fea 0%, #7c3aed 100%);
        }

        .btn-primary:active:not(:disabled) {
          transform: translateY(1px);
        }

        .btn-secondary {
          flex: 1;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          padding: 0.85rem 1.5rem;
          border-radius: 40px;
          font-weight: 600;
          font-size: 0.95rem;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover:not(:disabled) {
          background:rgb(9, 44, 80);
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .create-task-container {
            padding: 1rem;
          }
          .form-content {
            padding: 1.5rem;
          }
          .card-header h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="task-card">
        <div className="card-header">
          <h1>✨ Создать задачу</h1>
          <p>Заполните детали, и мы сохраним всё в системе</p>
        </div>

        <div className="form-content">
          {error && (
            <div className="error-alert">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                📋 Название задачи
                <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Например: Выучить весь FastApi за 1 день..."
                disabled={loading}
              />
              <div className="hint-text">
                <span>ℹ️</span> Минимум 3 символа, чтобы задачу было легко найти
              </div>
            </div>

            <div className="form-group">
              <label>
                📄 Описание
                <span className="required-star">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Опишите, что именно нужно сделать, добавьте детали, ссылки или требования..."
                disabled={loading}
              />
              <div className="hint-text">
                <span>💡</span> Чем подробнее, тем понятнее (мин. 10 символов)
              </div>
            </div>

            <div className="form-group">
              <label>
                🎯 Приоритет
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
              >
                <option value={TaskStatus.NORMAL}>🟢 {TaskStatus.NORMAL}</option>
                <option value={TaskStatus.MIDDLE}>🟠 {TaskStatus.MIDDLE}</option>
                <option value={TaskStatus.HARD}>🔴 {TaskStatus.HARD}</option>
              </select>
              <div className="hint-text">
                <span>⚡</span> Выберите срочность: обычные задачи в очереди, срочные — в приоритете
              </div>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                disabled={loading}
              />
              <label htmlFor="is_active">
                ✅ Активная задача
              </label>
            </div>
            <div className="hint-text" style={{ marginTop: '-0.25rem', marginLeft: '2rem' }}>
              <span>👁️</span> Неактивные задачи отображаются в основном списке
            </div>

            <div className="button-group">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Создаём...
                  </>
                ) : (
                  <>
                    🚀 Создать задачу
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="btn-secondary"
              >
                ← Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;