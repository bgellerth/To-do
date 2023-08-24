<template>
  <div class="bg-white flex justify-center items-center flex-col">
    <div class="flex flex-col p-4 items-center border-red-600 border-2">
      <img :src="warning" class="h-12" />
      <h1 class="text-red-600 text-lg">Are you Sure?</h1>
      <p>Do you really want to delete your todo?</p>
      <div class="flex flex-row gap-12 mt-4">
        <button
          class="bg-red-700 hover:bg-red-900 popup-buttons"
          @click="removeTodo"
        >
          Delete
        </button>
        <button
          class="bg-green-400 hover:bg-green-600 popup-buttons"
          @click="togglePopup"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import warning from '../assets/Warning.svg';

interface props {
  index: number;
}

const props = defineProps<props>();

const emit = defineEmits<{
  (e: 'removeTodo', index: number): void;
  (e: 'togglePopup'): void;
}>();

function togglePopup() {
  emit('togglePopup');
}

function removeTodo() {
  emit('removeTodo', props.index);
}
</script>
