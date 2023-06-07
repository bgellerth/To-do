<template>
  <select
    
    class="todo-priority"
    :class="[selectedPriority]"
    :disabled="!toDo.isEditing"
    v-model="selectedPriority"
    @change="handlePriorityChange(toDo)"
    ref="priority"
    @click.stop="handlePriorityClick(toDo)"
  >
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Todotype } from "../Types/toDo";

defineProps<{ toDo: Todotype }>();

const selectedPriority = ref("low");

function handlePriorityChange(toDo: Todotype) {
  if (toDo.isEditing) {
    toDo.priority = selectedPriority.value;
  }
}

function handlePriorityClick(toDo: Todotype) {
  if (!toDo.isEditing) {
    // Handle the click event when the item is not in editing mode
  }
}
</script>

<style scoped>
.todo-priority {
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  color: white;
}

.todo-priority.high {
  background-color: #ff481f;
  width: 91.75px;
  height: 33.4px;
  border-radius: 500px;
}

.todo-priority.medium {
  background-color: #ffab00;
  width: 125.53px;
  height: 33.4px;
  border-radius: 500px;
}

.todo-priority.low {
  background-color: #38cbcb;
  width: 91.75px;
  height: 33.4px;
  border-radius: 500px;
}

@media (max-width: 768px) {
  .todo-priority.high {
    background-color: #ff481f;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    padding: 0;
  }

  .todo-priority.medium {
    background-color: #ffab00;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    padding: 0;
  }

  .todo-priority.low {
    background-color: #38cbcb;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    padding: 0;
  }

  /* select {
    appearance: none;
  } */
}
</style>
