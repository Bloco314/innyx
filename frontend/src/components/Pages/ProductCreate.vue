<script setup lang="ts">
import { onMounted, ref } from "vue";
import { criarProduto } from "../../services/productService";
import type { Produto } from "../../models/product";
import type { Category } from "../../models/category";
import { useRouter } from "vue-router";
import Input from "../Atoms/Input.vue";
import PrimaryButton from "../Atoms/PrimaryButton.vue";
import { listarCategorias } from "../../services/categoryService";
import Spinner from "../Atoms/Spinner.vue";

const router = useRouter();

const produto = ref<Produto>({
  id: 0,
  nome: "",
  descricao: "",
  preco: 0,
  data_validade: "",
  imagem: "",
  categoria_id: null,
});
const categorias = ref<Category[]>([]);
const loading = ref(false);

async function handleSubmit() {
  const response = await criarProduto(produto.value);
  if (response.success) {
    router.back();
  } else {
    alert(`Erro ao criar produto: ${response.message || "Erro desconhecido"}`);
  }
}

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    produto.value.imagem = reader.result as string;
  };
  reader.readAsDataURL(file);
}

async function carregarCategorias() {
  loading.value = true;
  categorias.value = await listarCategorias();
  loading.value = false;
}

onMounted(() => carregarCategorias());
</script>

<template>
  <div class="container mt-4" style="max-width: 600px">
    <h2 class="text-white mb-4">Criação de produto</h2>
    <Spinner v-if="loading" />
    <form @submit.prevent="handleSubmit" v-if="!loading">
      <div class="mb-3 d-flex">
        <label class="text-white me-3" style="min-width: 130px">Nome:</label>
        <Input
          v-model="produto.nome"
          type="text"
          class="form-control w-100"
          required
        />
      </div>

      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 130px"
          >Descrição:</label
        >
        <Input
          v-model="produto.descricao"
          type="text"
          class="form-control w-100"
          required
        />
      </div>

      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 130px">Preço:</label>
        <Input
          v-model.number="produto.preco"
          type="number"
          class="form-control w-100"
          min="0"
          step="0.05"
          required
        />
      </div>

      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 130px"
          >Data de Validade:</label
        >
        <Input
          v-model="produto.data_validade"
          type="date"
          class="form-control w-100"
          required
        />
      </div>

      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 130px">Imagem:</label>
        <Input
          type="file"
          class="form-control w-100"
          @change="handleFileUpload"
          accept="image/*"
        />
      </div>

      <div class="mb-4 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 130px"
          >Categoria:</label
        >
        <select
          v-model.number="produto.categoria_id"
          class="form-select w-100"
          required
        >
          <option disabled value="">Selecione uma categoria</option>
          <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
            {{ cat.nome }}
          </option>
        </select>
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
form {
  display: block;
}

</style>
