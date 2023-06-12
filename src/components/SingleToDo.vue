<template>
  <div
    class="listed-items"
    @click="toggleEdit(toDo)"
    v-for="(toDo, index) in todos"
    :key="index"
  >
    <div class="content-container">
      <CheckTodo
        :toDo="toDo"
        class="status"
        @setCheckedTodos="setCheckedTodos"
        @notCheckedTodos="notCheckedTodos"
      />
      <div class="text-priority">
        <div class="text-title">
          <div>
            <input
              v-if="toDo.isEditing"
              class="title"
              type="text"
              placeholder="Title"
              @click.stop
              v-model="toDo.title"
              maxlength="15"
            />
            <p v-else class="todo-title">
              {{ toDo.title }}
            </p>
          </div>
          <div>
            <input
              v-if="toDo.isEditing"
              class="todo-text"
              type="text"
              placeholder="New to do"
              @click.stop
              v-model="toDo.text"
            />
            <p v-else class="todo-text">
              {{ toDo.text }}
            </p>
          </div>
        </div>
        <PrioSelector :toDo="toDo" class="priority" />
      </div>
    </div>
    <div class="delete-save-btn" v-if="toDo.isEditing">
      <SaveTodo :toDo="toDo" @todoSaved="saveTodo" />

      <button class="delete-button" @click="taskIndex(index)">
        <p>Delete</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrioSelector from "../components/PrioSelector.vue";
import CheckTodo from "./checkTodo.vue";
import SaveTodo from "../components/SaveTodo.vue";
import { Todotype } from "../Types/toDo";

const props = defineProps<{ todos: Todotype[] }>();
const emit = defineEmits<{
  (e: "toggleEdit", toDo: Todotype): void;
  (e: "setCheckedTodos", toDo: Todotype): void;
  (e: "saveTodo", toDo: Todotype): void;
  (e: "taskIndex", index: number): void;
  (e: "notCheckedTodos", toDo: Todotype): void;
}>();

function toggleEdit(toDo: Todotype) {
  emit("toggleEdit", toDo);
}
function setCheckedTodos(toDo: Todotype) {
  emit("setCheckedTodos", toDo);
}
function saveTodo(toDo: Todotype) {
  emit("saveTodo", toDo);
}
function taskIndex(index: number) {
  emit("taskIndex", index);
}

function notCheckedTodos(toDo: Todotype) {
  emit("notCheckedTodos", toDo);
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
    border: 2px solid black;
    border-radius: 16px;
  }

  .content-container {
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
}
</style>
