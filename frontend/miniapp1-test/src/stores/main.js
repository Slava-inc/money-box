// frontend/miniapp1/src/stores/main.ts
// Импорт defineStore из pinia (только один раз)
import { defineStore } from 'pinia';
// Импорт функций API из apiService.ts
// Переименовываем функцию addTransaction при импорте, чтобы избежать конфликта
// с именем действия (action) внутри store.
import { getUserGoal, createUserGoal, addTransaction as apiAddTransaction, getLeaderboard } from '../services/apiService';
export const useMainStore = defineStore('main', {
    // Состояние store
    state: () => ({
        goal: null, // Указывает, что goal может быть объектом Goal или null
        view: 'loading', // Типизированный state
        leaderboard: [], // Указывает, что leaderboard - это массив LeaderboardEntry
        telegramInitData: null, // Хранение initData
        error: null, // Хранение ошибки
    }),
    // Действия store
    actions: {
        // Установка initData (вызывается в App.vue или main.js, если получаете её глобально)
        setInitData(data) {
            this.telegramInitData = data;
        },
        // Загрузка данных пользователя/цели при запуске
        async fetchGoal() {
            this.view = 'loading';
            this.error = null;
            try {
                const goal = await getUserGoal();
                this.goal = goal;
                this.view = 'progress'; // Переход к экрану прогресса
            }
            catch (error) { // any для простоты, лучше типизировать ошибки
                if (error.message && error.message.includes('404')) {
                    // Цель не найдена, показываем форму
                    this.view = 'form';
                }
                else {
                    console.error('Error fetching goal:', error);
                    this.error = error.message || 'An error occurred';
                    this.view = 'error'; // Можно отобразить сообщение об ошибке
                }
            }
        },
        // Создание новой цели
        async createGoal(goalData) {
            try {
                const newGoal = await createUserGoal(goalData);
                this.goal = newGoal;
                this.view = 'progress'; // Переход к экрану прогресса
            }
            catch (error) {
                console.error('Error creating goal:', error);
                this.error = error.message || 'An error occurred';
            }
        },
        // Добавление транзакции (пополнение/снятие)
        async addTransaction(transactionData) {
            if (!this.goal) {
                console.error('No goal to update');
                return;
            }
            try {
                // Вызываем переименованную функцию API
                const apiTransactionResult = await apiAddTransaction(transactionData);
                // Обновляем локальное состояние цели
                this.goal.current_amount += transactionData.amount;
                // console.log('Transaction successful:', apiTransactionResult); // Логика обновления может быть сложнее
            }
            catch (error) {
                console.error('Error performing transaction:', error);
                this.error = error.message || 'An error occurred';
            }
        },
        // Загрузка лидерборда (для бота 2)
        async fetchLeaderboard() {
            try {
                const data = await getLeaderboard();
                this.leaderboard = data;
                // console.log('Leaderboard loaded:', data);
            }
            catch (error) {
                console.error('Error fetching leaderboard:', error);
                this.error = error.message || 'An error occurred';
            }
        }
    },
});
//# sourceMappingURL=main.js.map