<script setup>
import LoginPage from './components/Pages/LoginPage.vue';
</script>

<template>
  <div id="page">
    <router-view />
  </div>
</template>

<style>
 html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", Sans-serif;

}
#page{
  background-color: rgb(92, 44, 124);
  height: 100vh;
  min-width: 100vw;
  
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>