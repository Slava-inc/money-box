// frontend/miniapp1/src/services/apiService.ts

// --- Объявление типов ---
interface Goal {
  id: number;
  user_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  start_amount: number;
  created_at: string; // ISO 8601 строка
}

interface Transaction {
  id: number;
  goal_id: number;
  amount: number;
  timestamp: string; // ISO 8601 строка
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  progress_percentage: number; // 0.0 to 100.0
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://money-box-wkbl.onrender.com';

function getInitData() {
    // Получение initData из глобального объекта window.Telegram.WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        return window.Telegram.WebApp.initData;
    }
    console.error('Telegram WebApp SDK not found');
    return null;
}

// --- Тип для параметров запроса ---
interface ApiRequestOptions {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
}

async function apiRequest(endpoint: string, options: ApiRequestOptions = {}): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const initData = getInitData();
    if (!initData) {
        throw new Error('InitData not available');
    }

    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions: ApiRequestOptions = {
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
        } catch { // Игнорируем ошибку парсинга
           // Ничего не делаем
        }
        throw new Error(errorMessage);
    }

    return response.json();
}

// --- Экспортируем необходимые функции ---
export { apiRequest };

// --- Функции API ---

export async function getUserGoal(): Promise<Goal> {
  return apiRequest('/user/goal/');
}

export async function createUserGoal(goalData: Omit<Goal, 'id' | 'user_id' | 'current_amount' | 'created_at'>): Promise<Goal> {
  return apiRequest('/user/goal/', {
    method: 'POST',
    body: JSON.stringify(goalData)
  });
}

export async function addTransaction(transactionData: Omit<Transaction, 'id' | 'goal_id' | 'timestamp'>): Promise<Transaction> {
  return apiRequest('/user/goal/transaction/', {
    method: 'POST',
    body: JSON.stringify(transactionData)
  });
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
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
    } catch (error) {
        console.error('Error during debugInitData:', error);
        throw error;
    }
}