<!-- src/App.vue -->
<template>
  <div id="app">
    <ProdutoList />
  </div>
</template>

<script>
import ProdutoList from './components/ProdutoList.vue';

export default {
  name: 'App',
  components: {
    ProdutoList
  }
};
</script>
