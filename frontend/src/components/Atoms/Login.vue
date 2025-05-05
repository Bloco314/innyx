<script setup lang="ts">
import { ref } from "vue";
import { loginService } from "../../services/service";
import { useRouter } from "vue-router";
import PrimaryButton from "./PrimaryButton.vue";
import Input from "./Input.vue";

const router = useRouter();
const email = ref<string>("");
const password = ref<string>("");
const showPassword = ref(false);
const loading = ref(false);

async function login() {
  loading.value = true;
  const res = await loginService(email.value, password.value);

  if (res.success) {
    loading.value = false;
    router.push("/produtos/listar");
  } else {
    alert("Não foi possível realizar login");
  }
  loading.value = false;
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
        required
      />
      <div id="pass-wrapper">
        <Input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Senha"
          aria-label="Senha"
          required
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
      <PrimaryButton
        type="submit"
        :disabled="loading || email == '' || password == ''"
        >Entrar</PrimaryButton
      >
    </form>
  </div>
</template>

<style scoped>
h2{
  color: white;
}
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

    input {
      width: 200px;
    }
    button {
      margin-top: 12px;
    }
    #pass-wrapper {
      position: relative;

      span {
        position: absolute;
        right: 10px;
        top: 12px;
      }
    }
  }
}
</style>
