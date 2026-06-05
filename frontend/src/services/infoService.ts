const API_URL = `http://${window.location.hostname}:8000`

export const infoService = {
    async getInfo() {
        const response = await fetch(`${API_URL}/info/`)
        if (!response.ok) throw new Error('Ошибка загрузки информации')
        return response.json()
    }
}