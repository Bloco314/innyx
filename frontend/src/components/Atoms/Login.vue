<script setup>
import { ref } from "vue";
import { loginService } from "../../services/service";
import { useRouter } from 'vue-router'
import PrimaryButton from "./PrimaryButton.vue";
import Input from "./Input.vue";

const router = useRouter()
const email = ref("");
const password = ref("");
const erro = ref("");

async function login() {
  const res = await loginService(email.value, password.value);

  if (res.success) {
    erro.value = "";
    router.push("/home")
  } else {
    erro.value = res.message;
  }
}
</script>

<template>
  <div id="login-wrapper">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <Input  v-model="email" placeholder="Email"/>
      <Input v-model="password" type="password" placeholder="Senha"/>
      <PrimaryButton type="submit">Entrar</PrimaryButton>
    </form>
    <p v-if="erro" style="color: red">{{ erro }}</p>
  </div>
</template>

<style>
#login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    button {
      margin-top: 12px;
    }
  }
}
</style>
