<template>
  <input
    class="custom-input"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "blur"]);
</script>

<style scoped>
.custom-input {
  padding: 8px;
  border: 2px solid #6a6969;
  border-radius: 4px;
  font-size: 14px;

  background-color: white;
  color: black;
}

.custom-input:focus {
  outline: none;
  border-color: #007bff;
}
</style>
