<!-- frontend/miniapp1/src/App.vue -->
<template>
  <v-app>
    <v-main>
        <!-- Временный div для отображения initData -->
      <div v-if="initData" style="position: absolute; top: 0; left: 0; background: white; color: black; padding: 10px; z-index: 1000; font-size: 10px;">
        <h3>DEBUG: initData (временно!)</h3>
        <p>{{ initData }}</p>
      </div>
      <h1>You did it!</h1>
        Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
        documentation
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { debugInitData } from './services/apiService';

// --- Получение initData через window.Telegram.WebApp ---
const debugResult = ref<string | null>(null);

// --- Декларация типа для глобального объекта window ---
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        ready: () => void;
      };
    };
  }
}
// --- Получение initData через window.Telegram.WebApp ---
const initData = ref<string | null>(null);

onMounted(async () => {
  // Проверка наличия глобального объекта Telegram WebApp
  if (window.Telegram && window.Telegram.WebApp) {
    try {
      // Выполняем отладочный запрос
      const result = await debugInitData();
      debugResult.value = `Success: User ID ${result.id}, Username ${result.username}`;
    } catch (error) {
      const err = error as Error
      debugResult.value = `Error: ${err.message}`;
    }    
    // Получаем initData из глобального объекта
    initData.value = window.Telegram.WebApp.initData;
    console.log('App.vue: initData from window.Telegram.WebApp:', initData.value);
    // Опционально: сигнализируем Telegram, что WebApp готов
    // window.Telegram.WebApp.ready();
  } else {
    console.error('Telegram WebApp SDK not found. initData is null.');
    // Обработка ошибки: приложение не запущено в Telegram
    alert('Пожалуйста, откройте это приложение через Telegram-бота.');
  }
});

// ... остальная логика
</script>
<style scoped>
/* Стили */
</style>