<template>
  <div
    @click.stop="changePriority(toDo)"
    :class="[
      'w-3 h-3 rounded-full md:absolute md:top-6 md:right-5 md:w-32 md:h-9 md:cursor-pointer md:text-white ',
      { 'hidden md:block': toDo.isEditing },
      {
        'md:border-2 md:bg-white md:text-black md:border-black':
          toDo.isPriorityChanged,
      },
      getPriorityColor,
    ]"
  >
    <p
      class="hidden md:flex md:justify-center md:items-center md:leading-8 gap-2"
      :class="toDo.isPriorityChanged ? 'text-black' : 'text-white'"
    >
      {{ handlePriorityChange(toDo.priority) }}
      <arrowDown
        v-if="toDo.isEditing"
        :isPriorityChanged="toDo.isPriorityChanged"
        class="arrow-down md:w-5 md:h-5"
      />
    </p>
  </div>
  <div
    v-if="toDo.isEditing"
    :class="[
      'absolute top-4 gap-2 right-5 items-center flex flex-row md:hidden md:gap-0',
      {
        'md:dropdown-toggle md:justify-between md:absolute md:top-16 md:flex-col md:bg-white md:border-2 md:border-black rounded-2xl md:!flex':
          toDo.isPriorityChanged,
      },
    ]"
  >
    <div
      @click.stop="selectPriority(toDo, 0)"
      :class="[
        'bg-teal-400',
        'priority-options',
        { 'selected border border-black md:border-none': toDo.priority === 0 },
      ]"
    >
      <p class="desktop-priority">Low</p>
    </div>
    <div
      @click.stop="selectPriority(toDo, 1)"
      :class="[
        'bg-amber-500',
        'priority-options',
        { 'selected border border-black md:border-none': toDo.priority === 1 },
      ]"
    >
      <p class="desktop-priority">Medium</p>
    </div>
    <div
      @click.stop="selectPriority(toDo, 2)"
      :class="[
        'bg-orange-600',
        'priority-options',
        { 'selected border border-black md:border-none': toDo.priority === 2 },
      ]"
    >
      <p class="desktop-priority">High</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todotype } from '../Types/toDo';
import arrowDown from '../components/arrowDown.vue';
import { computed } from 'vue';
const props = defineProps<{ toDo: Todotype }>();

const priority = { 0: 'low', 1: 'medium', 2: 'high' };

const colorMaps: Record<number, string> = {
  0: 'bg-teal-400',
  1: 'bg-amber-400',
  2: 'bg-orange-600',
};
const getPriorityColor = computed(
  () => colorMaps[props.toDo.priority as keyof typeof colorMaps]
);

function handlePriorityChange(index: keyof typeof priority) {
  return priority[index];
}

function selectPriority(toDo: Todotype, number: number) {
  toDo.priority = number;
  toDo.isPriorityChanged = false;
}

function changePriority(toDo: Todotype) {
  if (toDo.isEditing) {
    toDo.isPriorityChanged = !toDo.isPriorityChanged;
  }
}
</script>
