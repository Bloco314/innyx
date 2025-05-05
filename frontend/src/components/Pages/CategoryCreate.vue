<script setup lang="ts">
import { ref } from "vue";
import { criarCategoria } from "../../services/categoryService";
import type { Category } from "../../models/category";
import { useRouter } from "vue-router";
import Input from "../Atoms/Input.vue";
import PrimaryButton from "../Atoms/PrimaryButton.vue";

const router = useRouter();

const categoria = ref<Category>({
  id: 0,
  nome: "",
});

const criar = async () => {
  const response = await criarCategoria(categoria.value);
  if (response.success) {
    router.back();
  } else {
    alert(`Erro ao criar produto: ${response.message || "Erro desconhecido"}`);
  }
};
</script>

<template>
  <div class="container mt-4" style="max-width: 600px">
    <h2 class="text-white mb-4">Criar Categoria</h2>
    <form @submit.prevent="criar">
      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 80px">Nome:</label>
        <Input
          v-model="categoria.nome"
          type="text"
          class="form-control w-100"
          placeholder="Nome da categoria"
          required
        />
      </div>

      <div class="mt-4">
        <PrimaryButton type="submit">Criar</PrimaryButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
h2 {
  color: white;
}
</style>
