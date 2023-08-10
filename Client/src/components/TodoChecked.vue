<template>
  <h1 class="text-lg py-3 font-bold md:text-xl">Done To-Dos:</h1>
  <div v-for="(checkedTodo, index) in checkedTodos" :key="index">
    <div>
      <SingleToDo
        :todos="[checkedTodo]"
        :checkedTodos="checkedTodos"
        :singleEditTodo="singleEditTodo"
        @editChecked="editChecked"
        @notCheckedTodos="notCheckedTodos"
        @saveTodo="saveTodo"
        @deleteCheckedTodos="deleteCheckedTodos"
        @setCheckedTodos="setCheckedTodos"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import SingleToDo from './SingleToDo.vue';
import { Todotype } from '../Types/toDo';

interface props {
  checkedTodos: Todotype[];
  todos: Todotype[];
  singleEditTodo: boolean;
}

const props = defineProps<props>();

const emit = defineEmits<{
  (e: 'notCheckedTodos', toDo: Todotype): void;
  (e: 'editChecked', checkedTodo: Todotype): void;
  (e: 'saveTodo', toDo: Todotype): void;
  (e: 'deleteCheckedTodos', index: number): void;
  (e: 'setCheckedTodos', toDo: Todotype): void;
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
function setCheckedTodos(toDo: Todotype) {
  emit('setCheckedTodos', toDo);
}
</script>
