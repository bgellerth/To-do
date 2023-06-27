<template>
  <div
    class="listed-items flex flex-col justify-center items-center relative w-72 min-h-82 border-2 border-black rounded-2xl p-5 md:width md:min-h-163"
    @click="toggleEdit(toDo)"
    v-for="(toDo, index) in todos"
    :key="index"
  >
    <div class="content-container flex items-center justify-between w-full">
      <CheckTodo
        :toDo="toDo"
        class="status mr-4 md:absolute md:mr-0 md:bottom-5 md:right-6"
        @setCheckedTodos="setCheckedTodos"
        @notCheckedTodos="notCheckedTodos"
        @deleteTodo="deleteTodo"
      />
      <div class="text-priority flex justify-between flex-grow">
        <div class="text-title flex flex-col w-4/5">
          <div>
            <input
              v-if="toDo.isEditing"
              class="title font-medium text-base w-3/4 border-none outline-none"
              type="text"
              placeholder="Title"
              @click.stop
              v-model="toDo.title"
              maxlength="15"
            />
            <p v-else class="todo-title md:text-4xl w-full">
              {{ toDo.title }}
            </p>
          </div>
          <div>
            <input
              v-if="toDo.isEditing"
              class="todo-text border-0 md:text-3xl text-gray-500 md:w-full outline-none"
              type="text"
              placeholder="New to do"
              @click.stop
              v-model="toDo.text"
            />
            <p
              v-else
              class="todo-text border-0 md:text-3xl text-gray-500 md:w-full outline-none"
            >
              {{ toDo.text }}
            </p>
          </div>
        </div>
        <PrioSelector :toDo="toDo" class="priority" />
      </div>
    </div>
    <div
      class="delete-save-btn flex gap-3 w-full mt-9 md:mt-9"
      v-if="toDo.isEditing"
    >
      <SaveTodo :toDo="toDo" @todoSaved="saveTodo" />

      <button
        class="delete-button text-sm font-semibold w-16 h-7 rounded-lg border-none outline-none bg-slate-300 py-1 px-2 md:w-32 md:h-12 md:text-lg md:rounded-2xl text-black"
        @click="taskIndex(index)"
      >
        <p>Delete</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrioSelector from '../components/PrioSelector.vue';
import CheckTodo from './checkTodo.vue';
import SaveTodo from '../components/SaveTodo.vue';
import { Todotype } from '../Types/toDo';

const props = defineProps<{ todos: Todotype[]; checkedTodos: Todotype[] }>();
const emit = defineEmits<{
  (e: 'toggleEdit', toDo: Todotype, checkedTodo: Todotype): void;
  (e: 'setCheckedTodos', toDo: Todotype): void;
  (e: 'saveTodo', toDo: Todotype): void;
  (e: 'taskIndex', index: number): void;
  (e: 'notCheckedTodos', toDo: Todotype): void;
  (e: 'deleteCheckedTodos', index: number): void;
}>();

function toggleEdit(checkedTodo: Todotype) {
  checkedTodo.isEditing = true;
}

function setCheckedTodos(toDo: Todotype) {
  emit('setCheckedTodos', toDo);
}

function saveTodo(toDo: Todotype) {
  emit('saveTodo', toDo);
}

function taskIndex(index: number) {
  emit('taskIndex', index);
  emit('deleteCheckedTodos', index);
}

function notCheckedTodos(toDo: Todotype) {
  emit('notCheckedTodos', toDo);
}

function deleteTodo(toDo: Todotype) {
  const index = props.todos.indexOf(toDo);
  if (index > -1) {
    props.todos.splice(index, 1);
  }
}
</script>

