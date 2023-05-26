<template>
  <div class="ToDoList">
    <TodoForm :index="0" />
  </div>
</template>

<script setup lang="ts">
import TodoForm from "../components/TodoForm.vue";
</script>
