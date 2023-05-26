<template>
  <button @click="removeTodo">x</button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';


const emit = defineEmits<{
  (e: 'todoRemoved', type: any): void
}>()

function removeTodo() {
  emit("todoRemoved", "");
}

</script>