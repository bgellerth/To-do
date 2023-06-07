<template>
  <div class="todo-list">
    <Header @todoAdded="addTodo" />
    <ClearAll @clearAll="clearAll" />
    <input
      v-if="todos.length"
      v-model="newTodo"
      maxlength="50"
      type="text"
      placeholder="Add a new ToDo"
    />
    <ul class="list">
      <div class="listed-items" v-for="(toDo, index) in todos" :key="index">
        <div class="delete-btn">
          <input class="title" type="text" placeholder="Title" />
          <input class="todo-text" type="text" placeholder="New to do" />
          {{ toDo }}
        </div>
        <div class="prio-check">
          <PrioSelector />
          <CheckTodo class="status" />
        </div>
      </div>
      <div class="no-input" v-if="!todos.length">
        <img class="workflow-img" :src="Workflow" />
        <p class="no-todos-text">You have no todos yet</p>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Workflow from "../assets/workflow.svg";
import Header from "./Header.vue";
import ClearAll from "../components/ClearAll.vue";
import PrioSelector from "../components/PrioSelector.vue";
import CheckTodo from "./checkTodo.vue";

defineProps<{ index: number }>();

const todos = ref<string[]>([]);
const newTodo = ref("");

function addTodo() {
  todos.value.push(newTodo.value);
  newTodo.value = "";
}

function clearAll() {
  todos.value = [];
}
</script>

<style scoped>
.no-input {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.no-todos-text {
  font-family: "Neue Haas Grotesk Display Pro";
  font-style: normal;
  font-weight: 600;
  font-size: 42px;
  line-height: 50px;

  color: #6d6d6d;
}
.todo-list {
  margin-top: 170px;
}
.prio-check {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.delete-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.list {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 50px;
}

.listed-items {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  list-style: none;

  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 16px;
  width: 600px;
  height: 163px;
}
.workflow-img {
  width: 270px;
  height: 315px;
}
.title {
  font-family: "Neue Haas Grotesk Display Pro";
  font-style: normal;
  font-weight: 600;
  font-size: 42px;
  line-height: 50px;
  width: 200px;
  border: none;
  outline: none;
}
.todo-text {
  font-family: "Neue Haas Grotesk Display Pro";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  border: none;
  outline: none;
}

@media (max-width: 768px) {
  .no-todos-text {
    font-size: 22px;
    line-height: 26px;
  }
  .workflow-img {
    width: 190px;
    height: 220px;
  }
  .listed-items {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;

    position: relative;

    width: 280px;
    height: 80px;
    max-height: 160px;

    background: #ffffff;
    border: 2px solid #000000;
    border-radius: 16px;
  }

  .status {
    position: absolute;
    top: 0;
    left: 1rem;
  }

  .todo-text {
    margin-left: 2rem;
  }

  .title {
    margin-left: 2rem;
  }
}
</style>
