<template>
  <div class="ToDoList w-screen h-screen flex justify-center">
    <TodoForm :index="0" />
  </div>
</template>

<script setup lang="ts">
import TodoForm from "../components/TodoForm.vue";
</script>
