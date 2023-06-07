<template>
  <button class="save-button" @click.stop="saveTodo">Save</button>
</template>

<script setup lang="ts">
import type { Todotype } from "../Types/toDo";

const props = defineProps<{
  toDo: Todotype;
}>();

const emit = defineEmits<{
  (e: "todoSaved", toDo: Todotype): void;
}>();

function saveTodo() {
  emit("todoSaved", props.toDo);
}
</script>

<style scoped>
.save-button {
  width: 120px;
  height: 50px;
  border: none;

  background: #38cb89;
  border-radius: 16px;
}
@media (max-width: 768px) {
  .save-button {
    width: 60px;
    height: 27px;
  }
}
</style>
