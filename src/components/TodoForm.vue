<template>
  <div class="wraper">
    <div v-if="popup" class="popup">
      <PopUp
        @removeTodo="removeTodo"
        @togglePopup="togglePopup"
        :index="selectedTaskIndex"
      />
    </div>
    <div class="todo-list">
      <Header @todoAdded="addTodo" />
      <ClearAll @clearAll="clearAll" />

      <div class="list">
        <SingleToDo
          :handleSearch="handleSearch"
          :todos="searchTodos"
          @toggleEdit="toggleEdit"
          @setCheckedTodos="setCheckedTodos"
          @saveTodo="saveTodo"
          @taskIndex="taskIndex"
          @notCheckedTodos="notCheckedTodos"
          :index="selectedTaskIndex"
          :checkedTodos="checkedTodos"
        />
        <Search v-model="handleSearch" v-if="todos.length" />
        <div class="no-input" v-if="!todos.length">
          <img class="workflow-img" :src="Workflow" />
          <p class="no-todos-text">You have no todos yet</p>
        </div>
      </div>
    </div>
    <TodoChecked
      v-if="checkedTodos.length > 0"
      :todos="todos"
      :checkedTodos="checkedTodos"
      @notCheckedTodos="notCheckedTodos"
      @toggleEdit="toggleEdit"
      @saveTodo="saveTodo"
      @deleteCheckedTodos="deleteCheckedTodos"
      @editChecked="editChecked"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import Workflow from "../assets/workflow.svg";
import Header from "./Header.vue";
import ClearAll from "../components/ClearAll.vue";
import SingleToDo from "../components/SingleToDo.vue";
import { Todotype } from "../Types/toDo";
import PopUp from "./PopUp.vue";
import TodoChecked from "./TodoChecked.vue";
import Search from "../components/Search.vue";

defineProps<{ index: number }>();

const todos = ref<Todotype[]>([]);
const newTodo = ref('');
const popup = ref(false);
const selectedTaskIndex = ref();
const checkedTodos = ref<Todotype[]>([]);
const handleSearch = ref('');

function setCheckedTodos(toDo: Todotype) {
  const index = todos.value.findIndex((item) => item === toDo);
  if (index !== -1) {
    const checkedTodo = todos.value.splice(index, 1)[0];
    checkedTodos.value.push(checkedTodo);
  }
}
function notCheckedTodos(toDo: Todotype) {
  const index = checkedTodos.value.findIndex((item) => item === toDo);
  if (index !== -1) {
    const uncheckedTodo = checkedTodos.value.splice(index, 1)[0];
    uncheckedTodo.status = false;

    todos.value.push({ ...uncheckedTodo });
  }
}
const searchTodos = computed(() => {
  return todos.value.filter((toDo) =>
    (toDo.title + toDo.text)
      .toLowerCase()
      .includes(handleSearch.value.toLowerCase())
  );
});

function taskIndex(index: number) {
  popup.value = true;
  selectedTaskIndex.value = index;
}

function togglePopup() {
  popup.value = !popup.value;
}

function toggleEdit(toDo: Todotype) {
  toDo.isEditing = !toDo.isEditing;
}
function addTodo() {
  todos.value.push({
    text: "Add your Todo",
    isEditing: false,
    priorityChange: false,
    priority: 0,
    title: "Title",
    status: false,
  });
  newTodo.value = "";
}

function clearAll() {
  todos.value = [];
  checkedTodos.value = [];
}

function removeTodo(index: number) {
  todos.value.splice(index, 1);
  togglePopup();
}
function saveTodo(toDo: Todotype) {
  toDo.isEditing = false;
}

onMounted(() => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos.value = JSON.parse(storedTodos);
  }
  const storedCheckedTodos = localStorage.getItem("checkedTodos");
  if (storedCheckedTodos !== null) {
    checkedTodos.value = JSON.parse(storedCheckedTodos);
  }
});

watch(
  todos,
  (newValue) => {
    localStorage.setItem("todos", JSON.stringify(newValue));
  },
  { deep: true }
);

watch(
  checkedTodos,
  (newValue) => {
    localStorage.setItem("checkedTodos", JSON.stringify(newValue));
  },
  { deep: true }
);

function deleteCheckedTodos(index: number) {
  checkedTodos.value.splice(index, 1);
}

function editChecked(checkedTodo: Todotype) {
  checkedTodo.isEditing = !checkedTodo.isEditing;
}
</script>

<style scoped>
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Neue Hass Grotesk Display Pro";
}
.no-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.workflow-img {
  width: 192px;
  height: 221px;
}
.text-priority {
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-grow: 1;
}

.content-container {
  display: flex;
  align-items: center;
  width: 100%;
}
.status {
  margin-right: 18px;
}
.listed-items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  min-height: 82px;
  width: 280px;
  border: 2px solid #000000;
  border-radius: 16px;
}

.content {
  position: relative;
  flex-direction: row-reverse;
  height: 100%;
  width: 100%;
}
.todo-text {
  border: 0;
}

.text-title {
  display: flex;
  flex-direction: column;
  width: 95%;
}

.title {
  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  width: 70%;
  border: 0;
}

.delete-button {
  font-size: 14px;
  font-weight: 600px;
  line-height: 17px;
  width: 69px;
  height: 27px;
  border-radius: 8px;
  border: 0;
  outline: 0;
  background-color: #e5e5e5;
  padding: 5px 15px;
}

.delete-save-btn {
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 38px;
}

.buttons {
  width: 60px;
  height: 27px;
}

.no-todos-text {
  font-size: 22px;
  line-height: 26px;
}

.workflow-img {
  width: 190px;
  height: 220px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 30px;
}
.popup {
  z-index: 99;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;

  width: 100%;
  height: 100%;
}
.wraper {
  position: relative;
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 768px) {
  .listed-items {
    width: 610px;
    height: 100%;
    min-height: 163px;
    justify-content: flex-start;
  }

  .status {
    position: absolute;
    margin-right: 0;
    bottom: 20px;
    right: 22px;
  }
  .delete-button {
    width: 120px;
    height: 52px;
    font-size: 18px;
    line-height: 22px;
    border-radius: 16px;
  }
  .todo-title {
    font-size: 42px;
    line-height: 50px;
    color: #757575;
    width: 80%;
  }
  .todo-text {
    font-size: 28px;
    line-height: 34px;
    color: #757575;
    width: 100%;
  }
  .text-title {
    width: 80%;
  }
  .delete-save-btn {
    margin-top: 30px;
  }
  .workflow-img {
    width: 273px;
    height: 315px;
  }
}
</style>
