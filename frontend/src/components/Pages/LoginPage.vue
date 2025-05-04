<script setup>
import { ref, computed } from 'vue'
import Login from '../Atoms/Login.vue'
import Register from '../Atoms/Register.vue'
import SecondaryButton from '../Atoms/SecondaryButton.vue'

const showRegister = ref(false) 
const transitionName = computed(() => (showRegister.value ? 'slide-left' : 'slide-right'))
</script>

<template>
  <div class="box">
    <div class="slide-wrapper">
        <transition :name="transitionName" mode="out-in">
            <component :is="showRegister ? Register : Login" :key="showRegister" class="form" />
        </transition>
    </div>

    <SecondaryButton @click="showRegister = !showRegister">
      {{ showRegister ? 'Já tem uma conta?':'Ainda não tem uma conta?' }}
    </SecondaryButton>
  </div>
</template>

<style scoped>
.box {
  width: 300px;
  height: 400px;
  background: linear-gradient(0deg,rgba(107, 33, 176, 1) 0%, rgb(73, 34, 125) 60%);
  border-radius: 12px;
  padding: 32px 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.slide-wrapper {
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.form {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0 0 24px 0;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

</style>
