import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// Импорт SDK
import { init } from '@twa-dev/sdk'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

// Инициализация SDK
// init() возвращает объект с методами и данными
const telegramWebApp = init();

// Получение initData
let initData = null;
if (telegramWebApp) {
  // initData находится в свойстве initData
  initData = telegramWebApp.initData;
  console.log('Telegram WebApp SDK loaded via npm');
  console.log('initData:', initData); // Для отладки
  // telegramWebApp.ready(); // Опционально
} else {
  console.error('Failed to initialize Telegram WebApp SDK via npm.');
  alert('Пожалуйста, откройте это приложение через Telegram-бота.');
}

app.config.globalProperties.$telegramInitData = initData;

app.use(vuetify).mount('#app')