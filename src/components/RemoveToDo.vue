<template>
  <button class="delete-button" @click="removeTodo">Delete</button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "todoRemoved"): void;
}>();

function removeTodo() {
  emit("todoRemoved");
}
</script>
<style scoped>
.delete-button {
  width: 120px;
  height: 50px;
  border: none;
  background: #e6e6e6;
  border-radius: 16px;
}
</style>
