<template>
  <div class="app">
    <ToDoList />
  </div>
</template>

<script setup lang="ts">
import ToDoList from './ToDoList.vue';
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
