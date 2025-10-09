import { ref, onMounted } from 'vue';
import { debugInitData } from './services/apiService';
// --- Получение initData через window.Telegram.WebApp ---
const debugResult = ref(null);
// --- Получение initData через window.Telegram.WebApp ---
const initData = ref(null);
onMounted(async () => {
    // Проверка наличия глобального объекта Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
        try {
            // Выполняем отладочный запрос
            const result = await debugInitData();
            debugResult.value = `Success: User ID ${result.id}, Username ${result.username}`;
        }
        catch (error) {
            const err = error;
            debugResult.value = `Error: ${err.message}`;
        }
        // Получаем initData из глобального объекта
        initData.value = window.Telegram.WebApp.initData;
        console.log('App.vue: initData from window.Telegram.WebApp:', initData.value);
        // Опционально: сигнализируем Telegram, что WebApp готов
        // window.Telegram.WebApp.ready();
    }
    else {
        console.error('Telegram WebApp SDK not found. initData is null.');
        // Обработка ошибки: приложение не запущено в Telegram
        alert('Пожалуйста, откройте это приложение через Telegram-бота.');
    }
});
// ... остальная логика
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VApp;
/** @type {[typeof __VLS_components.VApp, typeof __VLS_components.vApp, typeof __VLS_components.VApp, typeof __VLS_components.vApp, ]} */ ;
// @ts-ignore
VApp;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.VMain;
/** @type {[typeof __VLS_components.VMain, typeof __VLS_components.vMain, typeof __VLS_components.VMain, typeof __VLS_components.vMain, ]} */ ;
// @ts-ignore
VMain;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
if (__VLS_ctx.initData) {
    // @ts-ignore
    [initData,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    (__VLS_ctx.initData);
    // @ts-ignore
    [initData,];
}
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "https://vuejs.org/",
    target: "_blank",
    rel: "noopener",
});
var __VLS_9;
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        initData: initData,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=App.vue.js.map