<!-- components/GoalForm.vue -->
<template>
  <v-card class="mx-auto pa-4" max-width="500">
    <v-card-title>Создайте свою цель</v-card-title>
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="goalData.name"
        label="Название цели"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="goalData.target_amount"
        label="Целевая сумма"
        type="number"
        step="0.01"
        min="0.01"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="goalData.start_amount"
        label="Уже накоплено"
        type="number"
        step="0.01"
        min="0"
        required
      ></v-text-field>

      <v-btn type="submit" color="primary" block>Создать цель</v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
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
</script>