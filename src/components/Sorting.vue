<template>
  <div class="flex w-full justify-between flex-wrap gap-5">
    <div class="flex gap-3">
      <button class="sort-buttons">Title</button>
      <button class="sort-buttons">Description</button>
      <button class="sort-buttons">Priority</button>
      <button class="sort-buttons">Date</button>
    </div>

    <div class="flex gap-2">
      <button class="ascend-descend-btn bg-emerald-400">
        <img src="../assets/Ascending.svg" />
      </button>
      <button class="ascend-descend-btn bg-black">
        <img src="../assets/Descending.svg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
