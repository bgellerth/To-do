<template>
  <div class="flex w-full justify-between flex-wrap gap-5">
    <div class="flex gap-3">
      <button
        @click="handleClick('title')"
        :class="{
          'sort-buttons': true,
          ascendant: sortBy === 'title' && sortDirection === 'asc',
          descendant: sortBy === 'title' && sortDirection !== 'asc',
        }"
      >
        Title
      </button>
      <button
        @click="handleClick('text')"
        :class="{
          'sort-buttons': true,
          ascendant: sortBy === 'text' && sortDirection === 'asc',
          descendant: sortBy === 'text' && sortDirection !== 'asc',
        }"
      >
        Description
      </button>
      <button
        @click="handleClick('priority')"
        :class="{
          'sort-buttons': true,
          ascendant: sortBy === 'priority' && sortDirection === 'asc',
          descendant: sortBy === 'priority' && sortDirection !== 'asc',
        }"
      >
        Priority
      </button>
      <button
        @click="handleClick('date')"
        :class="{
          'sort-buttons': true,
          ascendant: sortBy === 'date' && sortDirection === 'asc',
          descendant: sortBy === 'date' && sortDirection !== 'asc',
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
import { defineProps, ref } from 'vue';
import { Todotype } from '../Types/toDo';

const props = defineProps<{ todos: Todotype[] }>();
const sortDirection = ref<SortDirection>('asc');
type SortDirection = 'asc' | 'desc';
const sortBy = ref<keyof Todotype>('title');

function handleClick(key: keyof Todotype) {
  sortBy.value = key;
  sortTodos(sortBy.value, sortDirection.value);
}

function sortTodos(sortBy: keyof Todotype, sortDirection: SortDirection) {
  if (sortBy === 'priority') {
    props.todos.sort((a: Todotype, b: Todotype) =>
      sortDirection === 'desc'
        ? b.priority - a.priority
        : a.priority - b.priority
    );
  } else if (sortBy === 'text') {
    props.todos.sort((a: Todotype, b: Todotype) =>
      sortDirection === 'desc'
        ? b[sortBy].localeCompare(a[sortBy])
        : a[sortBy].localeCompare(b[sortBy])
    );
  } else {
    props.todos.sort((a: Todotype, b: Todotype) =>
      sortDirection === 'desc'
        ? b[sortBy].localeCompare(a[sortBy])
        : a[sortBy].localeCompare(b[sortBy])
    );
  }
}

function handleSortDirectionChange(direction: SortDirection) {
  sortDirection.value = direction;
  sortTodos(sortBy.value, direction);
}
</script>
