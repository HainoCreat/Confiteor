const API_URL = 'http://127.0.0.1:5000'

export const infoService = {
    async getInfo() {
        const response = await fetch(`${API_URL}/info/`)
        if (!response.ok) throw new Error('Ошибка загрузки информации')
        return response.json()
    }
}