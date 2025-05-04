<script setup lang="ts">
import { ref } from "vue";
import { criarCategoria } from "../../services/categoryService";
import type { Category } from "../../models/category";
import Input from "../Atoms/Input.vue";
import PrimaryButton from "../Atoms/PrimaryButton.vue";

const categoria = ref<Category>({
  id: 0,
  nome: "",
});

const criar = async () => {
  const response = await criarCategoria(categoria.value);
  if (response.success) {
    window.location.reload();
  } else {
    alert(`Erro ao criar produto: ${response.message || "Erro desconhecido"}`);
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="criar">
      <h2>Criar Categoria</h2>
      <div>
        <label>Nome</label>
        <Input v-model="categoria.nome" placeholder="Nome da categoria" />
      </div>
      <PrimaryButton type="submit">Criar</PrimaryButton>
    </form>
  </div>
</template>
