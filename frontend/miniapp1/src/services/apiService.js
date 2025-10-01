// services/apiService.js

// --- Правильное использование API_BASE_URL ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://money-box-wkbl.onrender.com'; // 'http://localhost:8000'

// --- Пример использования options ---
async function apiRequest(endpoint, options = {}) { // options используется как параметр функции
    const initData = getInitData();
    if (!initData) {
        throw new Error('InitData not available');
    }

    const url = `${API_BASE_URL}${endpoint}`; // Используем API_BASE_URL
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${initData}`
        }
    };

    const finalOptions = {
        ...defaultOptions,
        ...options, // Используем options
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };

    const response = await fetch(url, finalOptions); // Передаем finalOptions

    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorMessage;
        } catch (e) {
            console.error('Error performing transaction:', e);
            alert(`Ошибка транзакции: ${e.message}`);

        }
        throw new Error(errorMessage);
    }

    return response.json();
}

// --- Экспортируем необходимые функции ---
export { apiRequest };