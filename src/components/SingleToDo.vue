<template>
  <div
    v-for="(toDo, index) in todos"
    class="flex flex-col justify-center items-center relative w-72 min-h-[82px] border-2 border-black rounded-2xl p-5 md:w-[600px] md:min-h-[163px]"
    :key="index"
    @click="handleClickInside(toDo)"
  >
    <div class="flex items-center justify-between w-full">
      <CheckTodo
        class="status mr-4 md:absolute md:mr-0 md:bottom-5 md:right-6"
        :toDo="toDo"
        @setCheckedTodos="setCheckedTodos"
        @notCheckedTodos="notCheckedTodos"
        @deleteTodo="deleteTodo"
      />
      <div class="flex justify-between flex-grow">
        <div class="text-title flex flex-col w-4/5">
          <div>
            <input
              v-if="toDo.isEditing"
              v-model="toDo.title"
              class="font-medium text-base w-3/4 border-none outline-none"
              type="text"
              placeholder="title"
              @click.stop
            />
            <p v-else class="md:text-4xl w-full">
              {{ toDo.title }}
            </p>
            <p class="text-xs text-gray-400 md:text-black">
              {{ toDo.date }}
            </p>
          </div>
          <div>
            <input
              v-if="toDo.isEditing"
              v-model="toDo.text"
              class="border-0 md:text-3xl text-gray-500 md:w-full outline-none"
              type="text"
              placeholder="New to do"
              @click.stop
            />
            <p
              v-else
              class="border-0 md:text-3xl text-gray-500 md:w-full outline-none"
            >
              {{ toDo.text }}
            </p>
          </div>
        </div>
        <PrioSelector :toDo="toDo" />
      </div>
      <p class="text-gray-400 text-sm"></p>
    </div>
    <div v-if="toDo.isEditing" class="flex gap-3 w-full mt-9 md:mt-9">
      <SaveTodo :toDo="toDo" @todoSaved="saveTodo" />

      <button
        class="text-sm font-semibold w-16 h-7 rounded-lg border-none outline-none bg-slate-300 hover:bg-slate-400 py-1 px-2 md:w-32 md:h-12 md:text-lg md:rounded-2xl text-black"
        @click="taskIndex(index)"
      >
        <p>Delete</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrioSelector from '../components/PrioSelector.vue';
import CheckTodo from './CheckTodo.vue';
import SaveTodo from '../components/SaveTodo.vue';
import { Todotype } from '../Types/toDo';
import { ref } from 'vue';

const editingTodo = ref<Todotype | null>(null);

interface props {
  todos: Todotype[];
  singleEditTodo: boolean;
  checkedTodos: Todotype[];
}

const props = defineProps<props>();

const emit = defineEmits<{
  (e: 'toggleEdit', toDo: Todotype, checkedTodo: Todotype): void;
  (e: 'setCheckedTodos', toDo: Todotype): void;
  (e: 'saveTodo', toDo: Todotype): void;
  (e: 'taskIndex', index: number): void;
  (e: 'notCheckedTodos', toDo: Todotype): void;
  (e: 'deleteCheckedTodos', index: number): void;
  (e: 'editingFalse'): void;
}>();

function toggleEdit(toDo: Todotype) {
  if (!props.singleEditTodo) {
    toDo.isEditing = true;
    emit('editingFalse');
  }
}

function handleClickInside(toDo: Todotype) {
  event.stopPropagation();
  if (toDo.isEditing) {
    return;
  }

  if (editingTodo.value && editingTodo.value !== toDo) {
    editingTodo.value.isEditing = false;
  }

  if (props.checkedTodos?.includes(toDo)) {
    props.checkedTodos.forEach((checkedToDo) => {
      if (checkedToDo.isEditing) {
        checkedToDo.isEditing = false;
      }
    });
  }

  editingTodo.value = toDo;
  toggleEdit(toDo);
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
