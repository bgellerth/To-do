<template>
  <div class="flex w-full justify-between flex-wrap gap-5">
    <div class="flex gap-3">
      <button @click="handleClick('title')" class="sort-buttons">Title</button>
      <button @click="handleClick('text')" class="sort-buttons">
        Description
      </button>
      <button @click="handleClick('priority')" class="sort-buttons">
        Priority
      </button>
      <button @click="handleClick('date')" class="sort-buttons">Date</button>
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
import { defineProps } from 'vue';
import { Todotype } from '../Types/toDo';

const props = defineProps<{ todos: Todotype[] }>();
let sortDirection = 'asc';
type SortDirection = "asc" | "desc"
let sortBy='title';

function handleClick(key: keyof Todotype) {
  sortBy = key
  sortTodos(key, sortDirection)
}

function sortTodos(sortBy: keyof Todotype, sortDirection: SortDirection) {
  if (sortBy === 'priority') {
    props.todos.sort((a: Todotype, b: Todotype) => sortDirection === 'desc' ? b.priority - a.priority : a.priority - b.priority);
  } else if (sortBy === 'text') {
    props.todos.sort((a: Todotype, b: Todotype) =>
      sortDirection === 'desc' ? b[sortBy].localeCompare(a[sortBy]) : a[sortBy].localeCompare(b[sortBy])
    );
  } else {
    props.todos.sort((a: Todotype, b: Todotype) =>
      sortDirection === 'desc' ? b[sortBy].localeCompare(a[sortBy]) : a[sortBy].localeCompare(b[sortBy])
    );
  }
}

function handleSortDirectionChange(direction: SortDirection) {
  sortDirection = direction;
  sortTodos(sortBy, direction)
}

</script>
