<template>
  <h1 class="title">What To Do?</h1>
  <button @click="addTodo" class="Add"></button>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: "todoAdded", value: string): void;
}>();

function addTodo() {
  emit("todoAdded", "Add-one-todo");
}
</script>

