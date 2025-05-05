<script setup lang="ts">
import { ref } from "vue";
import { criarProduto } from "../../services/productService";
import type { Produto } from "../../models/product";
import { useRouter } from "vue-router";
import Input from "../Atoms/Input.vue";
import PrimaryButton from "../Atoms/PrimaryButton.vue";

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
  reader.readAsDataURL(file); // converte para base64
}
</script>

<template>
  <div id="product-create-page">
    <h2>Criação de produto</h2>
    <form @submit.prevent="handleSubmit">
      <div class="input-wrapper">
        <label>Nome:</label>
        <Input v-model="produto.nome" type="text" required />
      </div>

      <div class="input-wrapper">
        <label>Descrição:</label>
        <Input v-model="produto.descricao" type="text" required></Input>
      </div>

      <div class="input-wrapper">
        <label>Preço:</label>
        <Input
          v-model.number="produto.preco"
          type="number"
          min="0"
          step="0.05"
          required
        />
      </div>

      <div class="input-wrapper">
        <label>Data de Validade:</label>
        <Input v-model="produto.data_validade" type="date" required />
      </div>

      <div class="input-wrapper input-img-wrapper">
        <label>Imagem</label>
        <Input type="file" @change="handleFileUpload" accept="image/*" />
      </div>

      <div class="input-wrapper">
        <label>Categoria ID:</label>
        <Input v-model.number="produto.categoria_id" type="number" />
      </div>

      <PrimaryButton id="btn-submit" type="submit">Criar</PrimaryButton>
    </form>
  </div>
</template>

<style scoped>
#product-create-page {
  display: flex;
  flex-direction: column;
}
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
