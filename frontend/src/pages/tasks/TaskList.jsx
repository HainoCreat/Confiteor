import { useState, useEffect } from 'react'
import axios from 'axios'

function TaskList() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/tasks/')
            .then(response => {
                setTasks([response.data]) 
                setLoading(false)
            })
            .catch(error => {
                console.error("Ошибка:", error)
                setLoading(false)
            })
    }, [])

    if (loading) return <div>Загрузка...</div>

    return (
        <div style={{ padding: '20px' }}>
            <h1>Список задач</h1>
            <p>Тестовое сообщение: <strong>{tasks[0]?.testmessage}</strong></p>
        </div>
    )
}

export default TaskList