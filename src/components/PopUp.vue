<template>
  <div
    class="bg-white h-52 w-64 border-solid border-2 border-color: rgb(128, 128, 128) rounded-3xl flex justify-center items-center flex-col"
  >
    <div
      class="flex flex-col p-4 items-center border-dashed border-red-600 border-2"
    >
      <p>You can cancel authorization at any time.</p>
      <div class="flex flex-row gap-12 mt-4">
        <button
          class="bg-red-700 text-white text-sm font-semibold w-16 h-7 rounded-lg border-0 outline-0"
          @click="removeTodo"
        >
          Delete
        </button>
        <button
          class="bg-green-400 text-white text-sm font-semibold w-16 h-7 rounded-lg border-0 outline-0"
          @click="togglePopup"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ index: number }>();
const emit = defineEmits<{
  (e: "removeTodo", index: number): void;
  (e: "togglePopup"): void;
}>();

function togglePopup() {
  emit("togglePopup");
}

function removeTodo() {
  emit("removeTodo", props.index);
}
</script>
