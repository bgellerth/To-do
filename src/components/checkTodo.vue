<template>
  <div v-if="!toDo.isEditing" class="flex content-center items-center">
    <div
      v-if="!toDo.status"
      class="w-6 h-6 border-solid border-black border-4 md:w-10 md:h-10 md:border-6 rounded-full"
      @click.stop="markTodoStatus(toDo)"
    ></div>
    <div v-else class="relative" @click.stop="markTodoStatus(toDo)">
      <div
        class="w-6 h-6 border-solid border-green-300 border-4 md:w-10 md:h-10 md:border-6 rounded-full"
      ></div>
      <img
        class="absolute -top-1 w-7 h-6 md:-top-1 md:left-0 md:w-11 md:h-9 md:absolute"
        src="../assets/Vector.svg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Todotype } from "../Types/toDo";

defineProps<{ toDo: Todotype }>();
const emit = defineEmits<{
  (e: "setCheckedTodos", toDo: Todotype): void;
  (e: "notCheckedTodos", toDo: Todotype): void;
}>();

function markTodoStatus(toDo: Todotype) {
  if (toDo.status) {
    toDo.status = false;
    emit("notCheckedTodos", toDo);
  } else {
    toDo.status = true;
    emit("setCheckedTodos", toDo);
  }
}
</script>
