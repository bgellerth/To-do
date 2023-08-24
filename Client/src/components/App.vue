<template>

  <RouterView></RouterView>
  
  <div class="w-screen h-screen flex justify-center">
    <TodoForm />
  </div>
</template>

<script setup lang="ts">
import TodoForm from './TodoForm.vue';
import '../assets/main.css';
</script>
<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
