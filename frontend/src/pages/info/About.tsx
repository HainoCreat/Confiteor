import { useState, useEffect } from 'react'
import { infoService } from '../../services/infoService';
import React from 'react';

function About() {
    const [info, setInfo] = useState({ title: '', message: '' })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadInfo = async () => {
            try {
                console.log('Загружаю about...') //Отладка
                const data = await infoService.getInfo()
                console.log('Полученные данные:', data) //Отладка
                setInfo(data)
            } catch (err) {
                console.error('Ошибка:', err) //Отладка
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadInfo()
    }, [])

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>

    return (
        <div>
            <h1>{info.title}</h1>
            <p>{info.message}</p>
        </div>
    )
}

export default About