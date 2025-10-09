import { onMounted, ref } from 'vue';
import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();
const loading = ref(false);
const headers = [
    { title: 'Место', key: 'rank' },
    { title: 'Пользователь', key: 'username' },
    { title: 'Прогресс', key: 'progress_percentage', value: (item) => `${item.progress_percentage.toFixed(1)}%` },
];
onMounted(async () => {
    loading.value = true;
    try {
        await mainStore.fetchLeaderboard();
    }
    catch (error) {
        console.error('Error fetching leaderboard:', error);
        // mainStore.error будет установлен в fetchLeaderboard
    }
    finally {
        loading.value = false;
    }
});
// Опционально: обновлять лидерборд периодически или по событию
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "mt-4" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "mt-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
VCardTitle;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
var __VLS_9;
const __VLS_11 = {}.VDataTable;
/** @type {[typeof __VLS_components.VDataTable, typeof __VLS_components.vDataTable, typeof __VLS_components.VDataTable, typeof __VLS_components.vDataTable, ]} */ ;
// @ts-ignore
VDataTable;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    headers: (__VLS_ctx.headers),
    items: (__VLS_ctx.mainStore.leaderboard),
    loading: (__VLS_ctx.loading),
    hideDefaultFooter: true,
    ...{ class: "elevation-1" },
    noDataText: "Данные загружаются...",
}));
const __VLS_13 = __VLS_12({
    headers: (__VLS_ctx.headers),
    items: (__VLS_ctx.mainStore.leaderboard),
    loading: (__VLS_ctx.loading),
    hideDefaultFooter: true,
    ...{ class: "elevation-1" },
    noDataText: "Данные загружаются...",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_15 } = __VLS_14.slots;
// @ts-ignore
[headers, mainStore, loading,];
{
    const { 'item.rank': __VLS_16 } = __VLS_14.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_16);
    if (item.rank === 1) {
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    }
    else if (item.rank === 2) {
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    }
    else if (item.rank === 3) {
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (item.rank);
    }
}
var __VLS_14;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['elevation-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        mainStore: mainStore,
        loading: loading,
        headers: headers,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=LeaderBoard.vue.js.map