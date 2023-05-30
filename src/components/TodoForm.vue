<template>
  <div class="ToDoList">
    <Header @todoAdded="addTodo" />
    <ClearAll @clearAll="clearAll" />
    <input
      v-if="todos.length"
      type="text"
      v-model="newTodo"
      placeholder="Add a new ToDo"
    />
    <ul>
      <li class="listed-itmes" v-for="(toDo, index) in todos" :key="index">
        {{ toDo }}
        <RemoveToDo @todoRemoved="removeTodo(index)" />
      </li>
      <img v-if="!todos.length" :src="Workflow" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Workflow from "../assets/workflow.png";
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

<style scoped>
.listed-items {
  box-sizing: border-box;
  list-style: none;
  position: center;
  width: 600px;
  height: 163px;
  left: 420px;
  top: 380px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 16px;
}
</style>
