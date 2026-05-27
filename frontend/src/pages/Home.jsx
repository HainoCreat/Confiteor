import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [message, setMessage] = useState('Загрузка...');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/')
            .then(response => {
                setMessage(response.data.message);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Ошибка", error);
                setMessage('❌ Ошибка соединения с сервером');
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="home-container">
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .home-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                /* Hero Card */
                .hero-card {
                    max-width: 900px;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    border-radius: 48px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2);
                    overflow: hidden;
                    transform: translateY(0);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .hero-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
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

                /* Header Section */
                .hero-header {
                    background: linear-gradient(105deg, #1e293b 0%, #2d3a4f 100%);
                    padding: 2.5rem 3rem;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .hero-header::before {
                    content: '✨';
                    position: absolute;
                    font-size: 120px;
                    opacity: 0.05;
                    top: -30px;
                    right: -20px;
                    pointer-events: none;
                }

                .hero-header::after {
                    content: '🚀';
                    position: absolute;
                    font-size: 100px;
                    opacity: 0.05;
                    bottom: -30px;
                    left: -20px;
                    pointer-events: none;
                }

                .hero-header h1 {
                    font-size: 3.5rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: transparent;
                    letter-spacing: -0.02em;
                    margin-bottom: 0.5rem;
                    position: relative;
                }

                .hero-subtitle {
                    color: #cbd5e1;
                    font-size: 1.1rem;
                    margin-top: 0.5rem;
                }

                /* Content Section */
                .hero-content {
                    padding: 2.5rem 3rem;
                }

                /* Status Card */
                .status-card {
                    background: linear-gradient(105deg, #f8fafc 0%, #f1f5f9 100%);
                    border-radius: 24px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(99, 102, 241, 0.1);
                    transition: all 0.2s ease;
                }

                .status-label {
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #6366f1;
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .status-value {
                    font-size: 1.25rem;
                    font-weight: 500;
                    color: #1e293b;
                    word-break: break-word;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: white;
                    border-radius: 40px;
                    font-size: 0.9rem;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }

                .loading-spinner {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #e2e8f0;
                    border-radius: 50%;
                    border-top-color: #6366f1;
                    animation: spin 0.6s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                /* Button Grid */
                .button-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .btn {
                    padding: 1rem 1.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    border-radius: 60px;
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    font-family: inherit;
                    position: relative;
                    overflow: hidden;
                }

    .btn-primary {
                    background: linear-gradient(105deg, #6366f1 0%, #8b5cf6 100%);
                    color: white;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
                }

                .btn-success {
                    background: linear-gradient(105deg, #10b981 0%, #059669 100%);
                    color: white;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
                }

                .btn-success:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
                }

                .btn-warning {
                    background: linear-gradient(105deg, #f59e0b 0%, #d97706 100%);
                    color: white;
                    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
                }

                .btn-warning:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.35);
                }

                .btn:active {
                    transform: translateY(1px);
                }

                /* Feature Cards */
                .features {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 1rem;
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 2px solid #f1f5f9;
                }

                .feature-item {
                    text-align: center;
                    padding: 1rem;
                    border-radius: 20px;
                    background: #ffffff;
                    transition: all 0.2s ease;
                }

                .feature-item:hover {
                    background: #f8fafc;
                    transform: translateY(-3px);
                }

                .feature-icon {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .feature-title {
                    font-weight: 600;
                    color: #1e293b;
                    font-size: 0.85rem;
                }

                /* Responsive */
                @media (max-width: 640px) {
                    .home-container {
                        padding: 1rem;
                    }
                    
                    .hero-header h1 {
                        font-size: 2.2rem;
                    }
                    
                    .hero-header, .hero-content {
                        padding: 1.5rem;
                    }
                    
                    .button-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .features {
                        grid-template-columns: 1fr;
                        gap: 0.75rem;
                    }
                }
            `}</style>

            <div className="hero-card">
                <div className="hero-header">
                    <h1>📋 Confiteor</h1>
                    <div className="hero-subtitle">
                        Управляй задачами с удовольствием
                    </div>
                </div>

                <div className="hero-content">
                    <div className="status-card">
                        <div className="status-label">
                            <span>🟢</span> Статус сервера
                        </div>
                        <div className="status-value">
                            {isLoading ? (
                                <div className="status-badge">
                                    <span className="loading-spinner"></span>
                                    <span>Проверка соединения...</span>
                                </div>
                            ) : (
                                <div className="status-badge">
                                    <span>{message.includes('❌') ? '🔴' : '✅'}</span>
                                    <span>{message}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="button-grid">
                        <Link to="/tasks" className="btn btn-primary">
                            📊 Список задач
                        </Link>
                        <Link to="/tasks/create" className="btn btn-success">
                            ➕ Создать задачу
                        </Link>
                        <Link to="/about" className="btn btn-warning">
                            ℹ️ О нас
                        </Link>
                    </div>

                    <div className="features">
                        <div className="feature-item">
                            <div className="feature-icon">🎯</div>
                            <div className="feature-title">Приоритеты задач</div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">⚡</div>
                            <div className="feature-title">Быстрое создание</div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🔄</div>
                            <div className="feature-title">Живой статус</div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🎨</div>
                            <div className="feature-title">Современный дизайн</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;