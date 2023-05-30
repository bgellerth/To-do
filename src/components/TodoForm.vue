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

defineProps({
  index: {
    type: Number,
    required: true,
  },
});
const todos = ref<string[]>([]);
const newTodo = ref("");

function addTodo() {
  todos.value.push(newTodo.value);
  newTodo.value = "";
}


function removeTodo(index: number) {
  todos.value.splice(index, 1);
}

function clearAll() {
  todos.value = [];
}
</script>
