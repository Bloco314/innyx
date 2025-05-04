<template>
  <button class="secondary-button" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>

const emit = defineEmits(["click"]);
</script>

<style scoped>
.secondary-button {
  background: none;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: white;
  border: none;
  cursor: pointer;
  outline: none;
  box-shadow: none;
}
</style>
