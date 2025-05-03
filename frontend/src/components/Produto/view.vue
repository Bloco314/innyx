<template>
    <div>
      <h2>Lista de Produtos</h2>
      <ul v-if="produtos.length">
        <li v-for="produto in produtos" :key="produto.id">
          {{ produto.nome }} - R$ {{ produto.preco }}
        </li>
      </ul>
      <p v-else>Carregando produtos...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProdutoList',
    data() {
      return {
        produtos: []
      };
    },
    mounted() {
      fetch('http://localhost:8000/api/produtos')
        .then(res => res.json())
        .then(data => this.produtos = data)
        .catch(err => console.error('Erro ao buscar produtos:', err));
    }
  };
  </script>
  