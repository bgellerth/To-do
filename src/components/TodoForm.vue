<template>
  <div class="w-full h-full search-bar md:desktop-search-bar">
    <div
      v-if="popup"
      class="z-50 absolute flex justify-center items-center inset-0 w-full h-full"
    >
      <PopUp
        @removeTodo="removeTodo"
        @togglePopup="togglePopup"
        :index="selectedTaskIndex"
      />
    </div>
    <div class="todo-list">
      <Header @todoAdded="addTodo" />

      <ClearAll @clearAll="clearAll" />
      <div class="flex flex-col-reverse items-center gap-8 md:gap-12">
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
        <Sorting />
        <Search v-model="handleSearch" v-if="todos.length" />
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
        @notCheckedTodos="notCheckedTodos"
        @toggleEdit="toggleEdit"
        @saveTodo="saveTodo"
        @deleteCheckedTodos="deleteCheckedTodos"
        @editChecked="editChecked"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import Workflow from '../assets/workflow.svg';
import Header from './Header.vue';
import ClearAll from '../components/ClearAll.vue';
import SingleToDo from '../components/SingleToDo.vue';
import Sorting from '../components/Sorting.vue';
import { Todotype } from '../Types/toDo';
import PopUp from './PopUp.vue';
import TodoChecked from './TodoChecked.vue';
import Search from '../components/Search.vue';

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
    text: 'Add your Todo',
    isEditing: false,
    priorityChange: false,
    priority: 0,
    title: 'Title',
    status: false,
  });
  newTodo.value = '';
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
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos.value = JSON.parse(storedTodos);
  }
  const storedCheckedTodos = localStorage.getItem('checkedTodos');
  if (storedCheckedTodos !== null) {
    checkedTodos.value = JSON.parse(storedCheckedTodos);
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
