<template>
  <div class="ToDoList">
    <Header @todoAdded="addTodo" />
    <ClearAll @clearAll="clearAll" />
    <ul>
      <li v-for="(toDo, index) in todos" :key="index">
        {{ toDo }}
        <RemoveToDo @todoRemoved="removeTodo(index)" />
      </li>
    </ul>
    <input type="text" v-model="newTodo" placeholder="Add a new ToDo" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "./Header.vue";
import ClearAll from "../components/ClearAll.vue";
import RemoveToDo from "../components/RemoveToDo.vue";

const todos = ref<string[]>([]);
const newTodo = ref("");

function addTodo() {
  if (newTodo.value) {
    todos.value.push(newTodo.value);
    newTodo.value = "";
  }
}
defineProps({
  index: {
    type: Number,
    required: true,
  },
});

function removeTodo(index: number) {
  todos.value.splice(index, 1);
}

function clearAll() {
  todos.value = [];
}
</script>
