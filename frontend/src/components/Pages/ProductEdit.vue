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
  if (result.success) {
    loading.value = false;
    router.back();
  } else {
    alert("Erro ao atualizar produto: " + result.message);
    loading.value = false;
  }
};

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    produto.value!.imagem = reader.result as string;
  };
  reader.readAsDataURL(file); // converte para base64
}

onMounted(() => carregarDados());
</script>

<template>
  <Spinner v-if="loading" />
  <form v-else-if="produto" @submit.prevent="handleSubmit">
    <h2>Edição de produto</h2>

    <img v-if="produto.imagem" :src="produto.imagem" />
    <div>
      <label>ID:</label>
      <Input :value="produto.id" :disabled="true" style="opacity: 0.8" />
    </div>

    <div>
      <label>Nome:</label>
      <Input v-model="produto.nome" />
    </div>

    <div>
      <label>Descrição:</label>
      <Input v-model="produto.descricao" />
    </div>

    <div>
      <label>Preço:</label>
      <Input v-model="produto.preco" type="number" />
    </div>

    <div>
      <label>Data de Validade:</label>
      <Input v-model="produto.data_validade" type="date" />
    </div>

    <div class="input-img-wrapper">
      <label>Imagem:</label>
      <Input type="file" @change="handleFileUpload" accept="image/*" />
      <SecondaryButton
        title="Remover imagem"
        type="button"
        id="btn-delete-img"
        :disabled="!produto.imagem"
        @click="produto.imagem = ''"
      >
        <i class="glyphicon glyphicon-trash"></i>
      </SecondaryButton>
    </div>

    <div>
      <label>Categoria:</label>
      <select v-model.number="produto.categoria_id" required>
        <option disabled value="">Selecione uma categoria</option>
        <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
          {{ cat.nome }}
        </option>
      </select>
    </div>

    <PrimaryButton id="btn-submit" type="submit">Salvar</PrimaryButton>
  </form>
</template>

<style>
h2 {
  color: white;
  margin-bottom: 12px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  img {
    max-height: 200px;
    max-width: 200px;
    object-fit: contain;
    margin: 2px;
  }
  .input-img-wrapper {
    display: flex;
    align-items: center;
    position: relative;

    #btn-delete-img {
      position: absolute;
      right: 0;
      color: black;
      font-size: 16px;
    }
  }
  label {
    color: white;
    width: 160px;
    text-align: left;
  }
  input {
    width: 400px;
  }
  select {
    background-color: white;
    color: black;
    width: 400px;
    padding: 6px;

    option {
      background-color: white;
      color: black;
    }
  }
  #btn-submit {
    margin-top: 12px;
  }
}

@media only screen and (max-width: 600px) {
  form {
    label {
      width: 100px;
    }
    input {
      width: 200px;
    }
    select {
      width: 200px;
    }
    .input-wrapper {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
