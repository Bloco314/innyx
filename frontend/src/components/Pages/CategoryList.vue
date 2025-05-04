<template>
  <div>
    <h2>Categorias</h2>
    <Spinner v-if="loading"/>

    <ul v-if="!loading">
      <li v-for="categoria in categorias" :key="categoria.id">
        {{ categoria.nome }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { listarCategorias } from "../../services/service";
import Spinner from "../Atoms/Spinner.vue";

const categorias = ref([]);
const loading = ref(false);

const carregarCategorias = async () => {
  loading.value = true;
  categorias.value = await listarCategorias();
  loading.value = false;
};

onMounted(() => carregarCategorias());
</script>
