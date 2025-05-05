<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  listarProdutosPaginado,
  filtrarProdutos,
  deletarProduto,
} from "../../services/productService";
import Spinner from "../Atoms/Spinner.vue";
import type { Produto } from "../../models/product";
import PrimaryButton from "../Atoms/PrimaryButton.vue";
import SecondaryButton from "../Atoms/SecondaryButton.vue";
import Input from "../Atoms/Input.vue";
import Navigate from "../Atoms/Navigate.vue";

const produtos = ref<Produto[]>([]);
const loading = ref(false);
const filtered = ref(false);
const page = ref(1);
const perPage = ref(10);
const total = ref(0);
const filtroNome = ref("");
const filtroDescricao = ref("");
const mostrarFiltros = ref(false);

const carregarProdutos = async () => {
  loading.value = true;
  const result = await listarProdutosPaginado(page.value, perPage.value);
  if (result.success && result.data) {
    produtos.value = result.data.items;
    total.value = result.data.total;
  } else {
    alert(`Erro ao carregar produtos: ${result.message}`);
  }
  loading.value = false;
};

const aplicarFiltros = async () => {
  loading.value = true;
  const result = await filtrarProdutos({
    nome: filtroNome.value,
    descricao: filtroDescricao.value,
  });
  if (result.success) {
    produtos.value = result.data;
    filtered.value = true;
  } else {
    alert(`Erro ao filtrar produtos: ${result.message}`);
  }
  loading.value = false;
};

const limparFiltros = () => {
  filtroNome.value = "";
  filtroDescricao.value = "";
  filtered.value = false;
  carregarProdutos();
};

async function excluirProduto(id: number) {
  if (!confirm("Tem certeza que deseja excluir este produto?")) return;
  const result = await deletarProduto(id);
  result.success
    ? filtered.value
      ? aplicarFiltros()
      : carregarProdutos()
    : alert(`Erro ao excluir: ${result.message}`);
}

onMounted(() => carregarProdutos());
</script>

<template>
  <div id="product-list" class="container mt-4">
    <Navigate />
    <h2 class="text-white mb-2">Produtos</h2>
    <hr class="border-light" />

    <!-- Filtros -->
    <section v-if="!loading" class="mb-3">
      <SecondaryButton
        @click="mostrarFiltros = !mostrarFiltros"
        title="Mostrar/Esconder Filtros"
      >
        <i
          :class="
            mostrarFiltros
              ? 'glyphicon glyphicon-chevron-up'
              : 'glyphicon glyphicon-chevron-down'
          "
        ></i>
        {{ mostrarFiltros ? "Fechar busca" : "Abrir busca" }}
      </SecondaryButton>

      <div
        v-if="mostrarFiltros"
        class="d-flex flex-wrap align-items-center gap-2 mt-2"
      >
        <Input v-model="filtroNome" placeholder="Buscar por nome" />
        <Input v-model="filtroDescricao" placeholder="Buscar por descrição" />
        <PrimaryButton
          title="Buscar por filtros"
          @click="aplicarFiltros"
          :disabled="filtroNome === '' && filtroDescricao === ''"
        >
          <i class="glyphicon glyphicon-search"></i>
        </PrimaryButton>
        <PrimaryButton
          title="Limpar filtros"
          @click="limparFiltros"
          :disabled="filtroNome === '' && filtroDescricao === ''"
        >
          <i class="glyphicon glyphicon-remove"></i>
        </PrimaryButton>
      </div>
    </section>

    <!-- Carregando -->
    <Spinner v-if="loading" />

    <!-- Tabela -->
    <section v-else>
      <div class="table-responsive">
        <table
          v-if="produtos.length"
          class="table table-striped table-bordered table-hover align-middle text-nowrap"
        >
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Validade</th>
              <th>Categoria</th>
              <th>Imagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtos" :key="produto.id">
              <td>{{ produto.id }}</td>
              <td>{{ produto.nome }}</td>
              <td>{{ produto.descricao }}</td>
              <td>R$ {{ produto.preco.toFixed(2) }}</td>
              <td>{{ produto.data_validade }}</td>
              <td>{{ produto.categoria_id }}</td>
              <td>
                <img
                  v-if="produto.imagem"
                  :src="produto.imagem"
                  alt="Imagem do produto"
                  class="img-fluid"
                  style="
                    max-width: 100px;
                    max-height: 100px;
                    object-fit: contain;
                  "
                />
              </td>
              <td>
                <button
                  class="btn btn-sm btn-outline-primary me-1"
                  @click="() => $router.push(`/produtos/editar/${produto.id}`)"
                >
                  <i class="glyphicon glyphicon-edit"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="() => excluirProduto(produto.id)"
                >
                  <i class="glyphicon glyphicon-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <span v-else class="text-white small">Nenhum produto encontrado.</span>
      </div>
    </section>

    <!-- Paginação -->
    <section
      v-if="!filtered && produtos.length && !loading"
      class="mt-3 d-flex justify-content-center align-items-center gap-2"
    >
      <PrimaryButton
        :disabled="page === 1"
        @click="
          () => {
            page--;
            carregarProdutos();
          }
        "
      >
        Anterior
      </PrimaryButton>
      <span class="text-white">Página {{ page }}</span>
      <PrimaryButton
        :disabled="produtos.length < perPage"
        @click="
          () => {
            page++;
            carregarProdutos();
          }
        "
      >
        Próxima
      </PrimaryButton>
    </section>

    <hr class="border-light" />
    <SecondaryButton
      class="mt-2"
      @click="() => $router.push(`/produtos/criar`)"
    >
      Criar novo produto
    </SecondaryButton>
  </div>
</template>

<style scoped>
#product-list {
  height: 100%;
}
</style>
