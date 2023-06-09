<template>
  <div class="ToDoList">
    <TodoForm :index="0" />
  </div>
</template>

<script setup lang="ts">
import TodoForm from "../components/TodoForm.vue";
</script>
<style>
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
