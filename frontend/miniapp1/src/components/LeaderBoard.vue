<!-- components/Leaderboard.vue -->
<template>
  <v-card class="mt-4">
    <v-card-title>Лидерборд</v-card-title>
    <v-data-table
      :headers="headers"
      :items="mainStore.leaderboard"
      :loading="loading"
      hide-default-footer
      class="elevation-1"
      no-data-text="Данные загружаются..."
    >
     <template #item.rank="{ item }">
        <span v-if="item.rank === 1">🥇</span>
        <span v-else-if="item.rank === 2">🥈</span>
        <span v-else-if="item.rank === 3">🥉</span>
        <span v-else>{{ item.rank }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
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
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        // mainStore.error будет установлен в fetchLeaderboard
    } finally {
        loading.value = false;
    }
});

// Опционально: обновлять лидерборд периодически или по событию
</script>