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
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Создание новой задачи
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>Ошибка!</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Название задачи <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите название задачи"
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">
              Минимум 3 символа
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Описание <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Подробно опишите задачу"
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">
              Минимум 10 символов
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
              Приоритет
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value={TaskStatus.NORMAL}>Обычная задача</option>
              <option value={TaskStatus.MIDDLE}>Срочная задача</option>
              <option value={TaskStatus.HARD}>Экстренная задача</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-blue-600"
                disabled={loading}
              />
              <span className="text-gray-700">Активная задача</span>
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Неактивные задачи не отображаются в основном списке
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Создание...
                </span>
              ) : (
                'Создать задачу'
              )}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreate;