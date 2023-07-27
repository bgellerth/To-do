<template>
  <div class="flex w-full justify-between flex-wrap gap-5">
    <div class="flex gap-3">
      <button
        :class="{
          'sort-buttons': true,
          ascendant: isSortedByTitle && sortDirection === 'asc',
          descendant: isSortedByTitle && sortDirection !== 'asc',
        }"
        @click="handleClick('title')"
      >
        Title
      </button>
      <button
        :class="{
          'sort-buttons': true,
          ascendant: isSortedByText && sortDirection === 'asc',
          descendant: isSortedByText && sortDirection !== 'asc',
        }"
        @click="handleClick('text')"
      >
        Description
      </button>
      <button
        :class="{
          'sort-buttons': true,
          ascendant: isSortedByPriority && sortDirection === 'asc',
          descendant: isSortedByPriority && sortDirection !== 'asc',
        }"
        @click="handleClick('priority')"
      >
        Priority
      </button>
      <button
        :class="{
          'sort-buttons': true,
          ascendant: isSortedByDate && sortDirection === 'asc',
          descendant: isSortedByDate && sortDirection !== 'asc',
        }"
        @click="handleClick('date')"
      >
        Date
      </button>
    </div>

    <div class="flex gap-2">
      <button
        class="ascend-descend-btn bg-emerald-400 hover:bg-emerald-500"
        @click="handleSortDirectionChange('asc')"
      >
        <img src="../assets/Ascending.svg" />
      </button>
      <button
        class="ascend-descend-btn bg-black hover:bg-slate-900"
        @click="handleSortDirectionChange('desc')"
      >
        <img src="../assets/Descending.svg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SortDirection } from '../Types/SortDirection';
import { Todotype } from '../Types/toDo';

const sortBy = ref('');
const isSortedByTitle = ref(false);
const isSortedByText = ref(false);
const isSortedByPriority = ref(false);
const isSortedByDate = ref(false);
const sortDirection = ref<SortDirection>('asc');

interface props {
  checkedTodos: Todotype[];
  todos: Todotype[];
}
const props = defineProps<props>();

function handleClick(key: string) {
  sortBy.value = key;
  updateSortByFlags();
  sortTodos(sortBy.value, sortDirection.value);
}

function updateSortByFlags() {
  isSortedByTitle.value = sortBy.value === 'title';
  isSortedByText.value = sortBy.value === 'text';
  isSortedByPriority.value = sortBy.value === 'priority';
  isSortedByDate.value = sortBy.value === 'date';
}

function sortTodos(sortBy: string, sortDirection: SortDirection) {
  if (sortBy === 'priority') {
    props.todos.sort((a: Todotype, b: Todotype) => {
      if (sortDirection === 'desc') {
        return b.priority - a.priority;
      }
      return a.priority - b.priority;
    });
    props.checkedTodos.sort((a: Todotype, b: Todotype) => {
      if (sortDirection === 'desc') {
        return b.priority - a.priority;
      }
      return a.priority - b.priority;
    });
    return;
  }

  props.todos.sort((a: Todotype, b: Todotype) => {
    if (sortDirection === 'desc') {
      return (b as any)[sortBy].localeCompare((a as any)[sortBy]);
    }
    return (a as any)[sortBy].localeCompare((b as any)[sortBy]);
  });
  props.checkedTodos.sort((a: Todotype, b: Todotype) => {
    if (sortDirection === 'desc') {
      return (b as any)[sortBy].localeCompare((a as any)[sortBy]);
    }
    return (a as any)[sortBy].localeCompare((b as any)[sortBy]);
  });
}

function handleSortDirectionChange(direction: SortDirection) {
  sortDirection.value = direction;
  sortTodos(sortBy.value, direction);
}
</script>
