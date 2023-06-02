<template>
  <div class="ToDoList">
    <Header @todoAdded="addTodo" />
    <ClearAll @clearAll="clearAll" />
    <input
      v-if="todos.length"
      maxlength="50"
      type="text"
      v-model="newTodo"
      placeholder="Add a new ToDo"
    />
    <ul class="list">
      <div class="listed-items" v-for="(toDo, index) in todos" :key="index">
        <div class="delete-btn">
          <p class="title">Pay for rent</p>
          <p class="todo-text">
            {{ toDo }}
          </p>
          <!-- <RemoveToDo @todoRemoved="removeTodo(index)" /> -->
        </div>
        <div class="prio-check">
          <PrioSelector />
          <CheckTodo class="status" />
        </div>
      </div>
      <img class="workflow-img" v-if="!todos.length" :src="Workflow" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Workflow from "../assets/workflow.png";
import Header from "./Header.vue";
import ClearAll from "../components/ClearAll.vue";
// import RemoveToDo from "../components/RemoveToDo.vue";
import PrioSelector from "../components/PrioSelector.vue";
import CheckTodo from "./checkTodo.vue";

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

// function removeTodo(index: number) {
//   todos.value.splice(index, 1);
// }

function clearAll() {
  todos.value = [];
}
</script>

<style scoped>
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
  flex-direction: column;
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
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .workflow-img {
    width: 280px;
    height: 280px;
    left: 15px;
    top: 210px;
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
