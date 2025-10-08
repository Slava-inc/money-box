// frontend/miniapp1/src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import { createPinia } from 'pinia'; // Импорт Pinia
//import { createRouter, createWebHistory } from 'vue-router' // Если используете маршрутизацию
//import  routes  from './router' // Если используете маршрутизацию
// Создание экземпляра Pinia
const pinia = createPinia();
// Создание экземпляра Vuetify
const vuetify = createVuetify({
    components,
    directives,
});
// Создание экземпляра приложения
const app = createApp(App);
// Подключение Pinia (и, при необходимости, маршрутизатора)
app.use(pinia);
//const routs = createRouter({ history: createWebHistory(), routes }) // Если используете маршрутизацию
//app.use(routs) // Если используете маршрутизацию
// Подключение Vuetify
app.use(vuetify);
// Монтирование приложения к элементу с id="app" в index.html
app.mount('#app');
//# sourceMappingURL=main.js.map