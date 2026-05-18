import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { taskService } from '../../services/taskService';

type TaskStatus = "Обычная задача" | "Срочная задача" | "Экстренная задача";

const TaskEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Обычная задача' as TaskStatus
    });
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        loadTask();
    }, [id]);
    
    const loadTask = async () => {
        try {
            setLoading(true);
            const task = await taskService.getTaskById(id);
            setFormData({
                title: task.title,
                description: task.description || '',
                status: task.status
            });
        } catch (err) {
            setError('Не удалось загрузить задачу');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title?.trim()) {
            setError('Название обязательно');
            return;
        }
    
        try {
            setSaving(true);
            setError(null);
    
            const updateData: any = {
                title: formData.title.trim(),
            };
    
            if (formData.description !== undefined) {
                updateData.description = formData.description.trim();
            }
            if (formData.status) {
                updateData.status = formData.status;
            }
            // is_active можно добавить позже
    
            await taskService.updateTask(Number(id), updateData);
            
            navigate('/tasks', { 
                state: { message: 'Задача успешно обновлена!' }
            });
        } catch (err: any) {
            console.error(err);
            if (err.response?.data?.detail) {
                setError(typeof err.response.data.detail === 'string' 
                    ? err.response.data.detail 
                    : JSON.stringify(err.response.data.detail));
            } else {
                setError('Ошибка при сохранении задачи');
            }
        } finally {
            setSaving(false);
        }
    };
    
    const handleCancel = () => {
        navigate('/tasks');
    };
    
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <div>Загрузка задачи...</div>
            </div>
        );
    }
    
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <Link to="/tasks">
                <button style={{
                    marginBottom: '20px',
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

            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '30px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ marginBottom: '20px' }}>Редактирование задачи #{id}</h1>
                
                {error && (
                    <div style={{
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '20px'
                    }}>
                        ❌ {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                            Название задачи *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Введите название задачи"
                            required
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                            Описание
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Введите описание задачи"
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                            Статус
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                        >
                            <option value="Обычная задача">📋 Обычная задача</option>
                            <option value="Срочная задача">⚡ Срочная задача</option>
                            <option value="Экстренная задача">🚨 Экстренная задача</option>
                        </select>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'flex-end'
                    }}>
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Отмена
                        </button>
                        <button 
                            type="submit" 
                            disabled={saving}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: saving ? 'not-allowed' : 'pointer',
                                opacity: saving ? 0.6 : 1
                            }}
                        >
                            {saving ? 'Сохранение...' : '💾 Сохранить изменения'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskEdit;