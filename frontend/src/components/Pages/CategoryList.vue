<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  listarCategorias,
  deletarCategoria,
} from "../../services/categoryService";
import SecondaryButton from "../Atoms/SecondaryButton.vue";
import Spinner from "../Atoms/Spinner.vue";
import type { Category } from "../../models/category";
import Navigate from "../Atoms/Navigate.vue";

const categorias = ref<Category[]>([]);
const loading = ref(false);

const carregarCategorias = async () => {
  loading.value = true;
  categorias.value = await listarCategorias();
  loading.value = false;
};

async function excluirCategoria(id: number) {
  if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

  const result = await deletarCategoria(id);
  if (result.success) {
    carregarCategorias();
  } else {
    alert(`Erro ao excluir: ${result.message}`);
  }
}

onMounted(() => carregarCategorias());
</script>

<template>
  <div id="category-list">
    <Navigate />
    <h2>Categorias</h2>
    <Spinner v-if="loading" />

    <table v-if="!loading">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias">
          <td>{{ categoria.id }}</td>
          <td>{{ categoria.nome }}</td>
          <td>
            <button
              title="Editar Categoria"
              class="btn-edit"
              @click="() => $router.push(`/categorias/editar/${categoria.id}`)"
            >
              <i class="glyphicon glyphicon-edit"></i>
            </button>
            <button
              title="Deletar categoria"
              class="btn-delete"
              @click="() => excluirCategoria(categoria.id)"
            >
              <i class="glyphicon glyphicon-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <SecondaryButton @click="() => $router.push(`/categorias/criar`)">
      Criar nova categoria
    </SecondaryButton>
  </div>
</template>

<style>
#category-list {
  height: 100%;
}
table {
  border-collapse: collapse;
  border: 2px solid black;
  display: block;
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;

  td,
  th {
    border: 1px solid black;
    padding: 12px 15px;
  }

  th {
    background-color: #ccc;
    color: black;
  }
  td {
    background-color: white;
    color: black;

    button {
      margin: 4px;
      font-size: 18px;
    }
    .btn-edit {
      background-color: rgb(136, 26, 136);
    }
    .btn-delete {
      background-color: rgb(204, 43, 43);
    }
  }
}
@media only screen and (max-width: 1000px) {
  table {
    max-width: 80%;
  }
}
</style>
