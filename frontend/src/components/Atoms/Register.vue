<template>
  <div>
    <h2>Registrar</h2>
    <form @submit.prevent="register">
      <input v-model="name" placeholder="Nome" />
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Senha" />
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");

async function register() {
  await fetch("/sanctum/csrf-cookie", {
    credentials: "include",
  });

  const token = getCookie("XSRF-TOKEN");

  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": decodeURIComponent(token),
    },
    credentials: "include",
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
    }),
  });

  if (res.ok) {
    alert("Registrado com sucesso!");
  } else {
    alert("Erro ao registrar");
  }
}

function getCookie(name) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookie?.split("=")[1];
}
</script>
