<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { obterProduto, atualizarProduto } from "../../services/productService";
import type { Produto } from "../../models/product";
import Spinner from "../Atoms/Spinner.vue";
import Input from "../Atoms/Input.vue";
import PrimaryButton from "../Atoms/PrimaryButton.vue";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const produto = ref<Produto>();
const loading = ref(false);

const carregarProduto = async () => {
  loading.value = true;
  const result = await obterProduto(id);
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

onMounted(() => carregarProduto());
</script>

<template>
  <Spinner v-if="loading" />
  <form v-else-if="produto" @submit.prevent="handleSubmit">
    <h2>Edição de produto</h2>
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
    </div>

    <div>
      <label>ID da Categoria:</label>
      <Input v-model="produto.categoria_id" type="number" />
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

  .input-img-wrapper {
    display: flex;
    align-items: center;
  }
  label {
    color: white;
    width: 160px;
    text-align: left;
  }
  input {
    width: 400px;
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
    .input-wrapper {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
