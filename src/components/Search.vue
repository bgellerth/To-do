<template>
  <div class="flex flex-row w-full border-2 border-black rounded-lg px-2 py-2">
    <div class="flex flex-row items-center flex-grow">
      <img :src="SearchIcon" class="search-icon w-4 h-4" />
      <input
        class="box-border border-none outline-none w-32 md:w-80"
        type="text"
        placeholder="Search todos..."
        v-model="searchInput"
      />
    </div>
    <button
      type="button"
      class="flex justify-center items-center py-1 px-4 gap-10px border-none w-16 h-8 top-2 left-52 text-white bg-black rounded-lg text-sm md:w-20"
    >
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SearchIcon from "../assets/SearchIcon.svg";

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", newValue: string): void;
}>();
const searchInput = computed({
  get() {
    return props.modelValue;
  },
  set(inputValue) {
    emit("update:modelValue", inputValue);
  },
});
</script>
