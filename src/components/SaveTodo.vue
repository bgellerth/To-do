<template>
  <button
    class="w-16 h-7 b-0 outline-0 bg-emerald-400 rounded-lg text-white text-sm font-semibold md:w-32 md:h-12 md:text-lg md:rounded-2xl"
    @click.stop="saveTodo"
  >
    Save
  </button>
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
