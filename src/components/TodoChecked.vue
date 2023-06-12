<template>
  <h1>Done To dos</h1>
  <div v-for="(checkedTodo, index) in checkedTodos" :key="index">
    <div>
      <SingleToDo :todos="[checkedTodo]" @notCheckedTodos="notCheckedTodos" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Todotype } from "../Types/toDo";
import SingleToDo from "./SingleToDo.vue";
defineProps<{ checkedTodos: Todotype[]; todos: Todotype[] }>();

const emit = defineEmits<{ (e: "notCheckedTodos", toDo: Todotype): void }>();

function notCheckedTodos(toDo: Todotype) {
  emit("notCheckedTodos", toDo);
}
</script>
