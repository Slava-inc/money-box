import { ref } from 'vue';
import { useMainStore } from '@/stores/main'; // Pinia store для управления состоянием
const mainStore = useMainStore();
const goalData = ref({
    name: '',
    target_amount: 0,
    start_amount: 0
});
const submitForm = async () => {
    await mainStore.createGoal(goalData.value);
    // После создания цели, mainStore.view будет изменен на 'progress'
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
var __VLS_9;
const __VLS_11 = {}.VForm;
/** @type {[typeof __VLS_components.VForm, typeof __VLS_components.vForm, typeof __VLS_components.VForm, typeof __VLS_components.vForm, ]} */ ;
// @ts-ignore
VForm;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ 'onSubmit': {} },
}));
const __VLS_13 = __VLS_12({
    ...{ 'onSubmit': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_15;
let __VLS_16;
const __VLS_17 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.submitForm) });
const { default: __VLS_18 } = __VLS_14.slots;
// @ts-ignore
[submitForm,];
const __VLS_19 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    modelValue: (__VLS_ctx.goalData.name),
    label: "Название цели",
    required: true,
}));
const __VLS_21 = __VLS_20({
    modelValue: (__VLS_ctx.goalData.name),
    label: "Название цели",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
// @ts-ignore
[goalData,];
const __VLS_24 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    modelValue: (__VLS_ctx.goalData.target_amount),
    modelModifiers: { number: true, },
    label: "Целевая сумма",
    type: "number",
    step: "0.01",
    min: "0.01",
    required: true,
}));
const __VLS_26 = __VLS_25({
    modelValue: (__VLS_ctx.goalData.target_amount),
    modelModifiers: { number: true, },
    label: "Целевая сумма",
    type: "number",
    step: "0.01",
    min: "0.01",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
// @ts-ignore
[goalData,];
const __VLS_29 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    modelValue: (__VLS_ctx.goalData.start_amount),
    modelModifiers: { number: true, },
    label: "Уже накоплено",
    type: "number",
    step: "0.01",
    min: "0",
    required: true,
}));
const __VLS_31 = __VLS_30({
    modelValue: (__VLS_ctx.goalData.start_amount),
    modelModifiers: { number: true, },
    label: "Уже накоплено",
    type: "number",
    step: "0.01",
    min: "0",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
// @ts-ignore
[goalData,];
const __VLS_34 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    type: "submit",
    color: "primary",
    block: true,
}));
const __VLS_36 = __VLS_35({
    type: "submit",
    color: "primary",
    block: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const { default: __VLS_38 } = __VLS_37.slots;
var __VLS_37;
var __VLS_14;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        goalData: goalData,
        submitForm: submitForm,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=GoalForm.vue.js.map