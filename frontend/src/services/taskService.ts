const API_URL = 'http://127.0.0.1:5000'

export const taskService = {
    async getTasks(skip = 0, limit = 100) {
        const response = await fetch(
            `${API_URL}/tasks/?page_skip=${skip}&page_limit=${limit}`
        );
        if (!response.ok) throw new Error('Ошибка загрузки задач');
        return response.json();
    },

    async getTaskById(id) {
        const response = await fetch(`${API_URL}/tasks/${id}`);
        if (!response.ok) throw new Error('Задача не найдена');
        return response.json();
    },

    async createTask(taskData) {
        const response = await fetch(`${API_URL}/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) throw new Error('Ошибка создания задачи');
        return response.json();
    },

    async updateTask(id, taskData) {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) throw new Error('Ошибка обновления задачи');
        return response.json();
    },

    async deleteTask(id) {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Ошибка удаления задачи');
        return true;
    }
};