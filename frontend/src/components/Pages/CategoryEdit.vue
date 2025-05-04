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
  if (result.success) {
    loading.value = false;
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
  <Spinner v-if="loading" />
  <form v-if="categoria && !loading"  @submit.prevent="handleSubmit">
    <h2>Editar Categoria</h2>
    <div>
      <label>ID</label>
      <Input v-model="categoria.id" :disabled="true" style="opacity: 0.8" />
    </div>
    <div>
      <label>Nome</label>
      <Input v-model="categoria.nome" placeholder="Nome da categoria" />
    </div>
    <PrimaryButton type="submit">Atualizar</PrimaryButton>
  </form>
</template>

<style>
form{
  label{
    width: 100px;
  }
  button{
    margin-top: 10px;
  }
}
</style>
