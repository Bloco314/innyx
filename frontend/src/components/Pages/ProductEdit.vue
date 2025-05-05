<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { obterProduto, atualizarProduto } from "../../services/productService";
import { listarCategorias } from "../../services/categoryService";
import type { Produto } from "../../models/product";
import Spinner from "../Atoms/Spinner.vue";
import Input from "../Atoms/Input.vue";
import PrimaryButton from "../Atoms/PrimaryButton.vue";
import type { Category } from "../../models/category";
import SecondaryButton from "../Atoms/SecondaryButton.vue";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const categorias = ref<Category[]>([]);

const produto = ref<Produto>();
const loading = ref(false);

const carregarDados = async () => {
  loading.value = true;
  const result = await obterProduto(id);
  categorias.value = await listarCategorias();
  produto.value = result.data;
  loading.value = false;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (!produto.value) return;

  loading.value = true;
  const result = await atualizarProduto(id, produto.value);
  loading.value = false;

  if (result.success) {
    router.back();
  } else {
    alert("Erro ao atualizar produto: " + result.message);
  }
};

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    produto.value!.imagem = reader.result as string;
  };
  reader.readAsDataURL(file);
}

onMounted(() => carregarDados());
</script>

<template>
  <div class="container mt-4" style="max-width: 600px">
    <Spinner v-if="loading" />
    <form v-else-if="produto" @submit.prevent="handleSubmit">
      <h2 class="text-white mb-4">Edição de produto</h2>

      <div class="mb-3 text-center">
        <img
          v-if="produto.imagem"
          :src="produto.imagem"
          alt="Imagem do produto"
          class="img-fluid"
          style="max-height: 200px; object-fit: contain"
        />
      </div>

      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 130px">ID:</label>
        <Input
          :value="produto.id"
          disabled
          class="form-control w-100"
          style="opacity: 0.8"
        />
      </div>

      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 130px">Nome:</label>
        <Input v-model="produto.nome" class="form-control w-100" />
      </div>

      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 130px"
          >Descrição:</label
        >
        <Input v-model="produto.descricao" class="form-control w-100" />
      </div>

      <div class="mb-3 d-flex align-items-center">
        <label class="text-white me-3" style="min-width: 130px">Preço:</label>
        <Input
          v-model.number="produto.preco"
          type="number"
          class="form-control w-100"
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
        />
      </div>

      <div class="mb-3 d-flex align-items-center position-relative">
        <label class="text-white me-3" style="min-width: 130px">Imagem:</label>
        <Input
          type="file"
          class="form-control w-100"
          @change="handleFileUpload"
          accept="image/*"
        />
        <SecondaryButton
          title="Remover imagem"
          type="button"
          class="position-absolute end-0"
          style="top: 0"
          :disabled="!produto.imagem"
          @click="produto.imagem = ''"
        >
          <i class="glyphicon glyphicon-trash"></i>
        </SecondaryButton>
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
        <PrimaryButton type="submit">Salvar</PrimaryButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
h2 {
  color: white;
}
</style>
