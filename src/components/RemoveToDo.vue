<template>
  <button class="delete-button" @click="removeTodo">Delete</button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "todoRemoved", type: any): void;
}>();

function removeTodo() {
  emit("todoRemoved", "");
}
</script>
<style scoped>
.delete-button {
  width: 119.64px;
  height: 52.05px;
  left: 570.36px;
  top: 472.94px;
  border: none;
  background: #e6e6e6;
  border-radius: 16px;
}
</style>
