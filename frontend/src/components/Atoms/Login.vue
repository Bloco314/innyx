<script setup lang="ts">
import { ref } from "vue";
import { loginService } from "../../services/service";
import { useRouter } from "vue-router";
import PrimaryButton from "./PrimaryButton.vue";
import Input from "./Input.vue";

const router = useRouter();
const email = ref<string>("");
const password = ref<string>("");

async function login() {
  const res = await loginService(email.value, password.value);

  if (res.success) {
    router.push("/produtos/listar");
  } else {
    alert("Não foi possível realizar login");
  }
}
</script>

<template>
  <div id="login-wrapper">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <Input
        v-model="email"
        type="email"
        placeholder="Email"
        aria-label="Email"
      />
      <Input
        v-model="password"
        type="password"
        placeholder="Senha"
        aria-label="Senha"
      />
      <PrimaryButton type="submit">Entrar</PrimaryButton>
    </form>
  </div>
</template>

<style scoped>
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
    
    input{
      width: 200px;
    }
    button {
      margin-top: 12px;
    }
  }
}
</style>
