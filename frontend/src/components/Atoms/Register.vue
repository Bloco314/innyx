<script setup lang="ts">
import { ref } from "vue";
import { registerService } from "../../services/service";
import PrimaryButton from "./PrimaryButton.vue";
import Input from "./Input.vue";

const name = ref("");
const email = ref("");
const password = ref("");

async function register() {
  const res = await registerService(name.value, email.value, password.value);

  if (res.success) {
    alert("Registrado com sucesso!");
    name.value = "";
    email.value = "";
    password.value = "";
  } else {
    alert("Erro ao registrar!");
  }
}
</script>

<template>
  <div>
    <h2>Registrar</h2>
    <form @submit.prevent="register">
      <Input v-model="name" placeholder="Nome" />
      <Input v-model="email" placeholder="Email" />
      <Input v-model="password" type="password" placeholder="Senha" />
      <PrimaryButton type="submit">Registrar</PrimaryButton>
    </form>
  </div>
</template>

<style scoped>
form{
  input{
    width: 200px;
  }
}
</style>