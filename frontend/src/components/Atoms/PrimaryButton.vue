<template>
  <button
    class="primary-button"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
</script>

<style scoped>
.primary-button {
  background-color: #007bff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-radius: 25px;
  padding: 10px 30px;
  background-color: white;
  color: rgb(92, 44, 124);
  border: none;
  cursor: pointer;
}

.primary-button:hover:not(:disabled) {
  opacity: 0.8;
}

.primary-button:disabled {
  opacity: 0.75;
  cursor: default;
}
</style>
