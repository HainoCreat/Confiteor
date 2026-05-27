import { useState, useEffect } from 'react';
import { infoService } from '../../services/infoService';
import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    const [info, setInfo] = useState({ title: '', message: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadInfo = async () => {
            try {
                console.log('Загружаю about...');
                const data = await infoService.getInfo();
                console.log('Полученные данные:', data);
                setInfo(data);
            } catch (err) {
                console.error('Ошибка:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadInfo();
    }, []);

    if (loading) {
        return (
            <div className="about-container">
                <style>{`
                    .about-container {
                        min-height: 100vh;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Inter', system-ui, sans-serif;
                    }
                    .loading-card {
                        background: white;
                        padding: 2rem;
                        border-radius: 32px;
                        text-align: center;
                        animation: pulse 1.5s ease-in-out infinite;
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.8; transform: scale(0.98); }
                    }
                    .spinner {
                        width: 40px;
                        height: 40px;
                        border: 3px solid #e2e8f0;
                        border-top-color: #6366f1;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite;
                        margin: 0 auto 1rem;
                    }
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
                <div className="loading-card">
                    <div className="spinner"></div>
                    <div style={{ color: '#4a5568', fontWeight: '500' }}>Загрузка информации...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="about-container">
                <style>{`
                    .about-container {
                        min-height: 100vh;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Inter', system-ui, sans-serif;
                    }
                    .error-card {
                        background: white;
                        padding: 2rem;
                        border-radius: 32px;
                        max-width: 500px;
                        text-align: center;
                        animation: shake 0.5s ease;
                    }
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-10px); }
                        75% { transform: translateX(10px); }
                    }
                `}</style>
                <div className="error-card">
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>😵</div>
                    <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Ошибка!</h2>
                    <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>{error}</p>
                    <Link to="/" className="error-btn">← Вернуться на главную</Link>
                </div>
                <style>{`
                    .error-btn {
                        display: inline-block;
                        padding: 0.75rem 1.5rem;
                        background: linear-gradient(105deg, #6366f1 0%, #8b5cf6 100%);
                        color: white;
                        text-decoration: none;
                        border-radius: 40px;
                        font-weight: 600;
                        transition: transform 0.2s;
                    }
                    .error-btn:hover {
                        transform: translateY(-2px);
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="about-container">
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .about-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                /* Основная карточка */
                .about-card {
                    max-width: 800px;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    border-radius: 48px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    overflow: hidden;
                    animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    transition: transform 0.3s ease;
                }

                .about-card:hover {
                    transform: translateY(-5px);
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Шапка с иконкой */
                .about-header {
                    background: linear-gradient(105deg, #1e293b 0%, #2d3a4f 100%);
                    padding: 2rem;
                    text-align: center;
                    position: relative;
                }

                .about-icon {
                    font-size: 3.5rem;
                    margin-bottom: 1rem;
                    display: inline-block;
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                .about-header h1 {
                    font-size: 2.5rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: transparent;
                    margin-bottom: 0.5rem;
                }

                /* Контент */
                .about-content {
                    padding: 2.5rem;
                }

                /* Секция с сообщением */
                .message-section {
                    background: linear-gradient(105deg, #f8fafc 0%, #f1f5f9 100%);
                    border-radius: 24px;
                    padding: 1.75rem;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(99, 102, 241, 0.1);
                }

                .message-label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #6366f1;
                    margin-bottom: 1rem;
                }

                .message-text {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: #334155;
                    margin-bottom: 1rem;
                }

                /* Умная цитата или дополнительная информация */
                .info-box {
                    background: white;
                    border-radius: 20px;
                    padding: 1.25rem;
                    margin-bottom: 2rem;
                    border-left: 4px solid #6366f1;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                }

                .info-box p {
                    color: #475569;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                }

                /* Кнопка назад */
                .back-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.85rem 2rem;
                    background: linear-gradient(105deg, #6366f1 0%, #8b5cf6 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 60px;
                    font-weight: 600;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
                    border: none;
                    cursor: pointer;
                    font-size: 0.95rem;
                }

                .back-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
                }

                /* Футер с доп. инфой */
                .about-footer {
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 2px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    font-size: 0.8rem;
                    color: #94a3b8;
                }

                .tech-badge {
                    background: #f1f5f9;
                    padding: 0.25rem 0.75rem;
                    border-radius: 30px;
                    font-size: 0.7rem;
                    font-weight: 500;
                    color: #475569;
                }

                /* Адаптив */
                @media (max-width: 640px) {
                    .about-container {
                        padding: 1rem;
                    }
                    .about-header h1 {
                        font-size: 1.8rem;
                    }
                    .about-content {
                        padding: 1.5rem;
                    }
                    .message-text {
                        font-size: 1rem;
                    }
                    .about-footer {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>

            <div className="about-card">
                <div className="about-header">
                    <div className="about-icon">📖</div>
                    <h1>{info.title || 'О проекте'}</h1>
                </div>

                <div className="about-content">
                    <div className="message-section">
                        <div className="message-label">
                            <span>💬</span> Сообщение от команды
                        </div>
                        <div className="message-text">
                            {info.message || 'Добро пожаловать! Здесь скоро появится информация о проекте.'}
                        </div>
                    </div>

                    <div className="info-box">
                        <p>
                            <span style={{ fontSize: '1.25rem' }}>✨</span>
                            <span>
                                <strong>Confiteor</strong> — это современное приложение для управления задачами.
                                Мы создали удобный интерфейс, чтобы вы могли легко отслеживать свои дела,
                                расставлять приоритеты и ничего не упускать.
                            </span>
                        </p>
                    </div>

                    <Link to="/" className="back-button">
                        ← На главную
                    </Link>

                    <div className="about-footer">
                        <span>© 2025 Confiteor</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <span className="tech-badge">React</span>
                            <span className="tech-badge">FastApi</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;