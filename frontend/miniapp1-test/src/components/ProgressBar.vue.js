import { ref } from 'vue';
import { useMainStore } from '../stores/main';
const mainStore = useMainStore();
const transactionAmount = ref(0);
const addFunds = async () => {
    if (transactionAmount.value <= 0) {
        alert("Введите положительную сумму для пополнения.");
        return;
    }
    await performTransaction({ amount: transactionAmount.value });
};
const withdrawFunds = async () => {
    if (transactionAmount.value <= 0) {
        alert("Введите положительную сумму для снятия.");
        return;
    }
    await performTransaction({ amount: -transactionAmount.value });
};
const performTransaction = async (transactionData) => {
    await mainStore.addTransaction(transactionData);
    transactionAmount.value = 0; // Сбрасываем поле ввода
};
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
    ...{ class: "mx-auto pa-4" },
    maxWidth: "500",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "mx-auto pa-4" },
    maxWidth: "500",
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
(__VLS_ctx.mainStore.goal.name);
// @ts-ignore
[mainStore,];
var __VLS_9;
const __VLS_11 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
VCardText;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_15 } = __VLS_14.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-h6 mb-2" },
});
(__VLS_ctx.mainStore.goal.current_amount.toFixed(2));
(__VLS_ctx.mainStore.goal.target_amount.toFixed(2));
// @ts-ignore
[mainStore, mainStore,];
const __VLS_16 = {}.VProgressLinear;
/** @type {[typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, ]} */ ;
// @ts-ignore
VProgressLinear;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    modelValue: ((__VLS_ctx.mainStore.goal.current_amount / __VLS_ctx.mainStore.goal.target_amount) * 100),
    height: "25",
    striped: true,
    color: "primary",
}));
const __VLS_18 = __VLS_17({
    modelValue: ((__VLS_ctx.mainStore.goal.current_amount / __VLS_ctx.mainStore.goal.target_amount) * 100),
    height: "25",
    striped: true,
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_20 } = __VLS_19.slots;
// @ts-ignore
[mainStore, mainStore,];
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
(((__VLS_ctx.mainStore.goal.current_amount / __VLS_ctx.mainStore.goal.target_amount) * 100).toFixed(1));
// @ts-ignore
[mainStore, mainStore,];
var __VLS_19;
var __VLS_14;
const __VLS_21 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
VCardActions;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_25 } = __VLS_24.slots;
const __VLS_26 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    modelValue: (__VLS_ctx.transactionAmount),
    modelModifiers: { number: true, },
    label: "Сумма",
    type: "number",
    step: "0.01",
    hideDetails: true,
    ...{ class: "mr-2" },
    ...{ style: {} },
}));
const __VLS_28 = __VLS_27({
    modelValue: (__VLS_ctx.transactionAmount),
    modelModifiers: { number: true, },
    label: "Сумма",
    type: "number",
    step: "0.01",
    hideDetails: true,
    ...{ class: "mr-2" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
// @ts-ignore
[transactionAmount,];
const __VLS_31 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    ...{ 'onClick': {} },
    color: "success",
}));
const __VLS_33 = __VLS_32({
    ...{ 'onClick': {} },
    color: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
let __VLS_35;
let __VLS_36;
const __VLS_37 = ({ click: {} },
    { onClick: (__VLS_ctx.addFunds) });
const { default: __VLS_38 } = __VLS_34.slots;
// @ts-ignore
[addFunds,];
var __VLS_34;
const __VLS_39 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    ...{ 'onClick': {} },
    color: "error",
}));
const __VLS_41 = __VLS_40({
    ...{ 'onClick': {} },
    color: "error",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
let __VLS_43;
let __VLS_44;
const __VLS_45 = ({ click: {} },
    { onClick: (__VLS_ctx.withdrawFunds) });
const { default: __VLS_46 } = __VLS_42.slots;
// @ts-ignore
[withdrawFunds,];
var __VLS_42;
var __VLS_24;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        mainStore: mainStore,
        transactionAmount: transactionAmount,
        addFunds: addFunds,
        withdrawFunds: withdrawFunds,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ProgressBar.vue.js.map