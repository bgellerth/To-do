<template>
  <h1 class=" text-lg py-3 font-bold md:text-xl">Done To-Dos:</h1>
  <div v-for="(checkedTodo, index) in checkedTodos" :key="index">
    <div>
      <SingleToDo
        @editChecked="editChecked"
        :todos="[checkedTodo]"
        @notCheckedTodos="notCheckedTodos"
        @saveTodo="saveTodo"
        @deleteCheckedTodos="deleteCheckedTodos"
        :checkedTodos="checkedTodos"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Todotype } from '../Types/toDo';
import SingleToDo from './SingleToDo.vue';

defineProps<{ checkedTodos: Todotype[]; todos: Todotype[] }>();

const emit = defineEmits<{
  (e: 'notCheckedTodos', toDo: Todotype): void;
  (e: 'editChecked', checkedTodo: Todotype): void;
  (e: 'saveTodo', toDo: Todotype): void;
  (e: 'deleteCheckedTodos', index: number): void;
}>();

function notCheckedTodos(toDo: Todotype) {
  emit('notCheckedTodos', toDo);
}

function saveTodo(toDo: Todotype) {
  emit('saveTodo', toDo);
}

function deleteCheckedTodos(index: number) {
  emit('deleteCheckedTodos', index);
}
function editChecked(checkedTodo: Todotype) {
  emit('editChecked', checkedTodo);
}
</script>
