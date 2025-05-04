<template>
  <div>
    <h2>Criar Categoria</h2>
    <input v-model="nome" placeholder="Nome da categoria" />
    <button @click="criar">Criar</button>
    <p v-if="erro" style="color: red">{{ erro }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { criarCategoria } from "../../services/service";

const nome = ref("");
const erro = ref("");

const criar = async () => {
  erro.value = "";
  const res = await criarCategoria(nome.value);
  if (!res.success) {
    erro.value = res.message || "Erro ao criar categoria";
  } else {
    nome.value = "";
    alert("Categoria criada com sucesso!");
  }
};
</script>
