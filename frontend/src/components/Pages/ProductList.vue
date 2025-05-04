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
import Input from "../Atoms/Input.vue";
import SecondaryButton from "../Atoms/SecondaryButton.vue";
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
  if (result.success) {
    filtered.value ? aplicarFiltros() : carregarProdutos();
  } else {
    alert(`Erro ao excluir: ${result.message}`);
  }
}

onMounted(() => carregarProdutos());
</script>

<template>
  <div id="product-list">
    <Navigate />
    <h2>Produtos</h2>
    <hr />

    <section v-if="!loading" id="btn-filters-wrapper">
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
      <div id="filters-wrapper" v-if="mostrarFiltros">
        <Input v-model="filtroNome" placeholder="Buscar por nome" />
        <Input v-model="filtroDescricao" placeholder="Buscar por descrição" />
        <PrimaryButton
          title="Buscar por filtros"
          @click="aplicarFiltros"
          :disabled="filtroNome == '' && filtroDescricao == ''"
        >
          <i class="glyphicon glyphicon-search"></i>
        </PrimaryButton>
        <PrimaryButton
          title="Limpar filtros"
          @click="limparFiltros"
          :disabled="filtroNome == '' && filtroDescricao == ''"
        >
          <i class="glyphicon glyphicon-remove"></i>
        </PrimaryButton>
      </div>
    </section>

    <Spinner v-if="loading" />
    <section v-else>
      <table v-if="produtos.length">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Validade</th>
          <th>Categoria</th>
          <th>Imagem</th>
          <th></th>
        </tr>
        <tr v-for="produto in produtos" :key="produto.id">
          <td>{{ produto.id }}</td>
          <td>{{ produto.nome }}</td>
          <td>{{ produto.descricao }}</td>
          <td>{{ produto.preco.toFixed(2) }}</td>
          <td>{{ produto.data_validade }}</td>
          <td>{{ produto.categoria_id }}</td>
          <td>
            <div v-if="produto.imagem">
              <img
                :src="produto.imagem"
                alt="Imagem do produto"
                style="max-width: 200px; max-height: 200px; object-fit: contain"
              />
            </div>
          </td>
          <td>
            <button
              title="Editar produto"
              class="btn-edit"
              @click="() => $router.push(`/produtos/editar/${produto.id}`)"
            >
              <i class="glyphicon glyphicon-edit"></i>
            </button>
            <button
              title="Deletar produto"
              class="btn-delete"
              @click="() => excluirProduto(produto.id)"
            >
              <i class="glyphicon glyphicon-trash"></i>
            </button>
          </td>
        </tr>
      </table>
      <span v-else>Nenhum produto encontrado.</span>
    </section>

    <!-- Paginação -->
    <section
      v-if="!filtered && produtos.length && !loading"
      style="margin-top: 1em"
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
      <span>Página {{ page }}</span>
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
  </div>
</template>

<style scoped>
#product-list {
  height: 100%;
}
h2 {
  color: white;
  margin-bottom: 0px;
}
#btn-filters-wrapper {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-bottom: 10px;
  margin-right: auto;

  button {
    border: 1px solid white;
    margin-bottom: 2px;
  }

  #filters-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
}
table {
  border-collapse: collapse;
  border: 2px solid black;
  display: block;
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  justify-self: center;

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
span {
  color: white;
  font-size: 14px;
  margin: 4px;
}
</style>
