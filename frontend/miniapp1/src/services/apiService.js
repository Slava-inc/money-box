// frontend/miniapp1/src/services/apiService.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://money-box-wkbl.onrender.com';
function getInitData() {
    // Получение initData из глобального объекта window.Telegram.WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        return window.Telegram.WebApp.initData;
    }
    console.error('Telegram WebApp SDK not found');
    return null;
}
async function apiRequest(endpoint, options = {}) {
    const initData = getInitData();
    if (!initData) {
        throw new Error('InitData not available');
    }
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${initData}`
        }
    };
    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    const response = await fetch(url, finalOptions);
    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorMessage;
        }
        catch { // Игнорируем ошибку парсинга
            // Ничего не делаем
        }
        throw new Error(errorMessage);
    }
    return response.json();
}
// --- Экспортируем необходимые функции ---
export { apiRequest };
// --- Функции API ---
export async function getUserGoal() {
    return apiRequest('/user/goal/');
}
export async function createUserGoal(goalData) {
    return apiRequest('/user/goal/', {
        method: 'POST',
        body: JSON.stringify(goalData)
    });
}
export async function addTransaction(transactionData) {
    return apiRequest('/user/goal/transaction/', {
        method: 'POST',
        body: JSON.stringify(transactionData)
    });
}
export async function getLeaderboard() {
    return apiRequest('/user/leaderboard/');
}
// --- Новая функция для отладки ---
export async function debugInitData() {
    try {
        // Отправляем запрос на эндпоинт /user/debug-initdata/
        const user = await apiRequest('/user/debug-initdata/');
        console.log('Debug: initData successfully sent to backend and verified.');
        console.log('User data from backend:', user);
        return user;
    }
    catch (error) {
        console.error('Error during debugInitData:', error);
        throw error;
    }
}
//# sourceMappingURL=apiService.js.map