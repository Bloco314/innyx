<script setup lang="ts">
import { ref } from "vue";
import SecondaryButton from "./SecondaryButton.vue";

const open = ref(false);
</script>

<template>
  <div id="navigate">
    <SecondaryButton
      id="nav-btn"
      @click="open = !open"
      title="Mostrar/Esconder Navegação"
    >
      <span>Navegar</span>
      <i
        :class="
          open
            ? 'glyphicon glyphicon-chevron-up'
            : 'glyphicon glyphicon-chevron-down'
        "
      ></i>
    </SecondaryButton>
    <SecondaryButton
      class="nav-option"
      v-if="open"
      @click="() => $router.push(`/produtos/listar`)"
    >
      <i class="glyphicon glyphicon-menu-right"></i>
      Produtos</SecondaryButton
    >
    <SecondaryButton
      class="nav-option"
      v-if="open"
      @click="() => $router.push(`/categorias/listar`)"
    >
      <i class="glyphicon glyphicon-menu-right"></i>
      Categorias</SecondaryButton
    >
  </div>
</template>

<style scoped>
#navigate {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  box-shadow: 1px;

  #nav-btn {
    gap: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
  }

  .nav-option {
    background-color: rgb(92, 44, 124);
    width: 125p;
  }
  .nav-option:hover {
    transform: scale(1.1);
    background-color: white;
    color: purple;
    border-radius: 0px;
  }
}

@media only screen and (max-width: 1000px) {
  #navigate {
    position: relative;
  }
}
</style>
