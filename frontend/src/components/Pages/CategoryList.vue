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
  result.success
    ? carregarCategorias()
    : alert(`Erro ao excluir: ${result.message}`);
}

onMounted(() => carregarCategorias());
</script>

<template>
  <div id="category-list" class="container mt-4">
    <Navigate />
    <h2 class="text-white mb-2">Categorias</h2>
    <hr class="border-light" />

    <Spinner v-if="loading" />

    <div
      v-else
      class="table-responsive-sm"
      style="max-height: 400px; overflow-y: auto"
    >
      <table
        class="table table-striped table-bordered table-hover align-middle text-nowrap"
      >
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categoria in categorias" :key="categoria.id">
            <td>{{ categoria.id }}</td>
            <td class="text-truncate" style="max-width: 200px">
              {{ categoria.nome }}
            </td>
            <td>
              <button
                class="btn btn-sm btn-outline-primary me-1"
                @click="
                  () => $router.push(`/categorias/editar/${categoria.id}`)
                "
              >
                <i class="glyphicon glyphicon-edit"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="() => excluirCategoria(categoria.id)"
              >
                <i class="glyphicon glyphicon-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr class="border-light" />
    <SecondaryButton
      class="mt-2"
      @click="() => $router.push(`/categorias/criar`)"
    >
      Criar nova categoria
    </SecondaryButton>
  </div>
</template>

<style scoped>
#category-list {
  height: 100%;
}
</style>
