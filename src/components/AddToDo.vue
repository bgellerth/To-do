
<template>
    <button @click="addTodo">Submit</button>
  </template>
  
  <script setup lang="ts">
  import { defineEmits } from 'vue';
  
  const emit = defineEmits<{
     (e: 'todoAdded', value: string): void
}>()
  
  function addTodo() {
    emit("todoAdded", "Add-one-todo");
}
  </script>


  

