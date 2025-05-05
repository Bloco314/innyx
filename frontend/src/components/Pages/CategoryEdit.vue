<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  atualizarCategoria,
  obterCategoria,
} from "../../services/categoryService";
import type { Category } from "../../models/category";
import PrimaryButton from "../Atoms/PrimaryButton.vue";
import Input from "../Atoms/Input.vue";
import Spinner from "../Atoms/Spinner.vue";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const categoria = ref<Category>();
const loading = ref(false);

const carregarCategoria = async () => {
  loading.value = true;
  const result = await obterCategoria(id);
  categoria.value = result.data;
  loading.value = false;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (!categoria.value) return;

  loading.value = true;
  const result = await atualizarCategoria(categoria.value);
  loading.value = false;

  if (result.success) {
    router.back();
  } else {
    alert("Erro ao atualizar produto: " + result.message);
  }
};

onMounted(() => {
  carregarCategoria();
});
</script>

<template>
  <div class="container mt-4" style="max-width: 600px">
    <Spinner v-if="loading" />
    <form v-if="categoria && !loading" @submit.prevent="handleSubmit">
      <h2 class="text-white mb-4">Editar Categoria</h2>

      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 90px">ID:</label>
        <Input
          v-model="categoria.id"
          disabled
          class="form-control w-100"
          style="opacity: 0.8"
        />
      </div>

      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 90px">Nome:</label>
        <Input
          v-model="categoria.nome"
          class="form-control w-100"
          placeholder="Nome da categoria"
        />
      </div>

      <div class="mt-4">
        <PrimaryButton type="submit">Atualizar</PrimaryButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
h2 {
  color: white;
}
</style>
