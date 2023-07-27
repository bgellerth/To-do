<template>
  <div
    class="w-screen h-screen flex justify-center"
    @click="handleClickOutside"
  >
    <div class="w-[287px] h-[68px] h md:w-[600px]">
      <div
        v-if="isPopedUp"
        class="z-50 absolute flex justify-center items-center inset-0 w-full h-full"
      >
        <PopUp
          :index="selectedTaskIndex"
          @removeTodo="removeTodo"
          @togglePopup="togglePopup"
        />
      </div>
      <div class="todo-list">
        <Header @todoAdded="addTodo" />
        <div class="flex flex-col items-center gap-8 md:gap-12">
          <Search v-model="handleSearch" v-if="todos.length" />
          <Sorting :todos="todos" :checkedTodos="checkedTodos" />
          <SingleToDo
            :todos="searchTodos"
            :checkedTodos="checkedTodos"
            :singleEditTodo="singleEditTodo"
            @toggleEdit="toggleEdit"
            @saveTodo="saveTodo"
            @taskIndex="taskIndex"
            @notCheckedTodos="notCheckedTodos"
            @set-checked-todos="setCheckedTodos"
          />

          <div class="flex flex-col items-center" v-if="!todos.length">
            <img class="w-48 h-56 md:w-72 md:h-80" :src="Workflow" />
            <p class="text-xl md:text-3xl text-gray-500 font-semibold">
              You have no todos yet
            </p>
          </div>
        </div>
      </div>
      <div class="w-full flex items-center flex-col">
        <TodoChecked
          v-if="checkedTodos.length"
          :todos="todos"
          :checkedTodos="checkedTodos"
          :singleEditTodo="singleEditTodo"
          @notCheckedTodos="notCheckedTodos"
          @toggleEdit="toggleEdit"
          @saveTodo="saveTodo"
          @deleteCheckedTodos="deleteCheckedTodos"
          @editChecked="editChecked"
          @setCheckedTodos="setCheckedTodos"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';

import Header from './Header.vue';
import Workflow from '../assets/Workflow.svg';
import SingleToDo from '../components/SingleToDo.vue';
import Sorting from '../components/Sorting.vue';
import PopUp from './PopUp.vue';
import TodoChecked from './TodoChecked.vue';
import Search from '../components/Search.vue';
import moment from 'moment';

import { Todotype } from '../Types/toDo';
import { v4 as uuidv4 } from 'uuid';

interface props {
  index: number;
}

const props = defineProps<props>();

const singleEditTodo = ref<boolean>(false);
const todos = ref<Todotype[]>([]);
const newTodo = ref('');
const isPopedUp = ref(false);
const selectedTaskIndex = ref();
const checkedTodos = ref<Todotype[]>([]);
const handleSearch = ref('');

function handleClickOutside() {
  const clickedElement = event.target as HTMLElement;

  if (!clickedElement.closest('.editing-area')) {
    singleEditTodo.value = false;

    todos.value.forEach((toDo) => {
      toDo.isEditing = false;
    });

    checkedTodos.value.forEach((toDo) => {
      toDo.isEditing = false;
    });
  }
}

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
    uncheckedTodo.isChecked = false;

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
  isPopedUp.value = true;
  selectedTaskIndex.value = index;
}

function togglePopup() {
  isPopedUp.value = !isPopedUp.value;
}

function toggleEdit(toDo: Todotype) {
  if (!toDo.isEditing)
    todos.value.forEach((todos: Todotype) => {
      todos.isEditing = false;
    });

  toDo.isEditing = !toDo.isEditing;
}

function addTodo() {
  const date = moment().format('DD.MM.YYYY');
  todos.value.unshift({
    text: 'Add your Todo',
    isEditing: false,
    isPriorityChanged: false,
    priority: 0,
    title: 'Title',
    isChecked: false,
    date: date,
    sort: '',
    index: todos.value.length,
    id: uuidv4(),
  });
  newTodo.value = '';
}

function removeTodo(index: number) {
  todos.value.splice(index, 1);
  togglePopup();
}

function saveTodo(toDo: Todotype) {
  toDo.isEditing = false;
  singleEditTodo.value = false;
}

onMounted(() => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos.value = JSON.parse(storedTodos);
  }
});

watch(
  todos,
  (newValue) => {
    localStorage.setItem('todos', JSON.stringify(newValue));
  },
  { deep: true }
);

watch(
  checkedTodos,
  (newValue) => {
    localStorage.setItem('checkedTodos', JSON.stringify(newValue));
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
