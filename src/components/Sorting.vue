<template>
  <div class="flex w-full justify-between flex-wrap gap-5">
    <div class="flex gap-3">
      <button
        @click="handleClick('title')"
        :class="{
          'sort-buttons': true,
          ascendant: isSortedByTitle && sortDirection === 'asc',
          descendant: isSortedByTitle && sortDirection !== 'asc',
        }"
      >
        Title
      </button>
      <button
        @click="handleClick('text')"
        :class="{
          'sort-buttons': true,
          ascendant: isSortedByText && sortDirection === 'asc',
          descendant: isSortedByText && sortDirection !== 'asc',
        }"
      >
        Description
      </button>
      <button
        @click="handleClick('priority')"
        :class="{
          'sort-buttons': true,
          ascendant: isSortedByPriority && sortDirection === 'asc',
          descendant: isSortedByPriority && sortDirection !== 'asc',
        }"
      >
        Priority
      </button>
      <button
        @click="handleClick('date')"
        :class="{
          'sort-buttons': true,
          ascendant: isSortedByDate && sortDirection === 'asc',
          descendant: isSortedByDate && sortDirection !== 'asc',
        }"
      >
        Date
      </button>
    </div>

    <div class="flex gap-2">
      <button
        @click="handleSortDirectionChange('asc')"
        class="ascend-descend-btn bg-emerald-400"
      >
        <img src="../assets/Ascending.svg" />
      </button>
      <button
        @click="handleSortDirectionChange('desc')"
        class="ascend-descend-btn bg-black"
      >
        <img src="../assets/Descending.svg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Todotype } from '../Types/toDo';
import { SortDirection } from '../Types/SortDirection';

const sortBy = ref('');
const isSortedByTitle = ref(false);
const isSortedByText = ref(false);
const isSortedByPriority = ref(false);
const isSortedByDate = ref(false);
const props = defineProps<{ todos: Todotype[] }>();
const sortDirection = ref<SortDirection>('asc');

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
    return;
  }

  props.todos.sort((a: Todotype, b: Todotype) => {
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
