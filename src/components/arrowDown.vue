<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="-1 0 27 27"
    stroke-width="2.5"
    :stroke="priorityChange ? 'black' : 'white'"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
</template>
<script setup lang="ts">
const props = defineProps<{ priorityChange: boolean }>();
</script>
