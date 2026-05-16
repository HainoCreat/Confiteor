import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('Загрузка...')
  const [status, setStatus] = useState('') 

  useEffect(() => {
    axios.get('http://127.0.0.1:5000')
      .then(response => {
        setMessage(response.data.message); 
        setStatus(response.data.message); 
      })
      .catch(error => {
        console.error("Ошибка при получении данных: ", error);
        setMessage('Ошибка соединения');
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Связка React + FastAPI работает!</h1>
      <p>Ответ от бэкенда: <strong>{message}</strong></p>
    </div>
  );
}

export default App