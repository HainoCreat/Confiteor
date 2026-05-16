import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
    const [message, setMessage] = useState('Загрузка...')

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/')
            .then(response => {
                setMessage(response.data.message)
            })
            .catch(error => {
                console.error("Ошибка", error)
                setMessage('Ошибка соединения')
            })
    }, [])  

    return (
        <div style={{ padding: '20px' }}>
            <h1>Главная страница</h1>
            <p>Ответ от бэкенда: <strong>{message}</strong></p>
        </div>
    )
}

export default Home