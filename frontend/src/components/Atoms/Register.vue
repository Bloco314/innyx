<script setup lang="ts">
import { ref } from "vue";
import { registerService } from "../../services/service";
import PrimaryButton from "./PrimaryButton.vue";
import Input from "./Input.vue";

const name = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

async function register() {
  loading.value = true;
  const res = await registerService(name.value, email.value, password.value);

  if (res.success) {
    loading.value = false;
    alert("Registrado com sucesso!");
    name.value = "";
    email.value = "";
    password.value = "";
  } else {
    alert("Erro ao registrar!");
  }
  loading.value = false;
}
</script>

<template>
  <div class="container mt-4" style="max-width: 500px">
    <h2 class="text-white mb-4">Registrar</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label class="form-label text-white">Nome</label>
        <Input v-model="name" class="form-control" placeholder="Nome" />
      </div>

      <div class="mb-3">
        <label class="form-label text-white">Email</label>
        <Input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Email"
        />
      </div>

      <div id="pass-wrapper" class="mb-3">
        <label class="form-label text-white">Senha</label>
        <Input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Senha"
          aria-label="Senha"
          required
          minlength="6"
        />
        <span
          @click="showPassword = !showPassword"
          :title="showPassword ? 'Esconder senha' : 'Mostrar senha'"
          :class="
            showPassword
              ? 'glyphicon glyphicon-eye-close'
              : 'glyphicon glyphicon-eye-open'
          "
        ></span>
      </div>

      <div class="mt-4">
        <PrimaryButton type="submit">Registrar</PrimaryButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
h2 {
  color: white;
  margin-bottom: 4px;
}
#pass-wrapper {
  position: relative;

  input {
    width: 100%;
    padding-right: 40px;
  }

  span {
    position: absolute;
    right: 12px;
    top: 60%;
  }
}
</style>
