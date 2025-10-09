<!-- components/ProgressBar.vue -->
<template>
  <v-card class="mx-auto pa-4" max-width="500">
    <!-- Проверяем, что goal существует -->
    <div v-if="mainStore.goal">
      <v-card-title>{{ mainStore.goal.name }}</v-card-title>
      <v-card-text>
        <div class="text-h6 mb-2">
          {{ mainStore.goal.current_amount.toFixed(2) }} / {{ mainStore.goal.target_amount.toFixed(2) }} руб.
        </div>
        <v-progress-linear
          :model-value="(mainStore.goal.current_amount / mainStore.goal.target_amount) * 100"
          height="25"
          striped
          color="primary"
        >
          <strong>{{ ((mainStore.goal.current_amount / mainStore.goal.target_amount) * 100).toFixed(1) }}%</strong>
        </v-progress-linear>
      </v-card-text>
      <v-card-actions>
        <v-text-field
          v-model.number="transactionAmount"
          label="Сумма"
          type="number"
          step="0.01"
          hide-details
          class="mr-2"
          style="max-width: 150px;"
        ></v-text-field>
        <v-btn @click="addFunds" color="success">+</v-btn>
        <v-btn @click="withdrawFunds" color="error">-</v-btn>
      </v-card-actions>
    </div>
    <!-- Если goal не существует, показываем сообщение -->
    <div v-else>
      Цель не найдена. Пожалуйста, создайте цель.
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';

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

const performTransaction = async (transactionData: { amount: number }) => {
    await mainStore.addTransaction(transactionData);
    transactionAmount.value = 0; // Сбрасываем поле ввода
};
</script>