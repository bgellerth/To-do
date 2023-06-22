<template>
  <div class="flex-col my-8 mx-auto md:max-width w-full">
    <div class="flex justify-between items-center">
      <h1 class="m-0 font-semibold text-2xl md:text-7xl">To do list</h1>
      <button
        @click="addTodo"
        class="w-8 h-8 bg-emerald-500 rounded-full md:w-14 md:h-14 md:border-0"
      >
        <svg viewBox="-4 -4 32 32" stroke-width="1.5" stroke="white">
          <path d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "todoAdded"): void;
}>();

function addTodo() {
  emit("todoAdded");
}
</script>
