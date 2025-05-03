<template>
  <div id="app">
    <h1>Frontend Vue</h1>
    <p v-if="loading">Carregando mensagem...</p>
    <p v-else>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getHello } from './services/api';

const message = ref('');
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await getHello();
    message.value = data.message;
  } catch {
    message.value = 'Erro ao buscar API.';
  } finally {
    loading.value = false;
  }
});
</script>

<style>
body {
  font-family: sans-serif;
  padding: 2rem;
}
</style>
