<template>
  <div
    @click.stop="changePriority(toDo)"
    :class="[
      'todo-priority-container',
      { 'todo-priority': toDo.isEditing },
      { 'dropdown-active': toDo.priorityChange },
      handlePriorityChange(toDo.priority),
    ]"
  >
    <p class="desktop-priority">
      {{ handlePriorityChange(toDo.priority) }}
      <arrowDown :priorityChange="toDo.priorityChange" class="arrow-down" />
    </p>
  </div>
  <div
    v-if="toDo.isEditing"
    :class="['dropdown', { 'dropdown-toggle': toDo.priorityChange }]"
  >
    <div
      @click.stop="selectPriority(toDo, 0)"
      :class="['low', 'priorities', { selected: toDo.priority === 0 }]"
    >
      <p class="desktop-priority">Low</p>
    </div>
    <div
      @click.stop="selectPriority(toDo, 1)"
      :class="['medium', 'priorities', { selected: toDo.priority === 1 }]"
    >
      <p class="desktop-priority">Medium</p>
    </div>
    <div
      @click.stop="selectPriority(toDo, 2)"
      :class="['high', 'priorities', { selected: toDo.priority === 2 }]"
    >
      <p class="desktop-priority">High</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todotype } from "../Types/toDo";
import arrowDown from "../components/arrowDown.vue";
defineProps<{ toDo: Todotype }>();

const priority = { 0: "low", 1: "medium", 2: "high" };

function handlePriorityChange(index: keyof typeof priority) {
  return priority[index];
}

function selectPriority(toDo: Todotype, number: number) {
  toDo.priority = number;
  toDo.priorityChange = false;
}

function changePriority(toDo: Todotype) {
  if (toDo.isEditing) {
    toDo.priorityChange = !toDo.priorityChange;
  }
}
</script>

<style scoped>
.todo-priority {
  display: none;
}
.desktop-priority {
  display: none;
}

.selected {
  border: 1px solid black;
}

.dropdown {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  top: 9px;
  right: 20px;
}
.priorities {
  height: 10px;
  width: 10px;
  border-radius: 50%;
}
.todo-priority-container {
  width: 10px;
  height: 10px;

  border-radius: 50%;
}

.high {
  background-color: #ff481f;
}

.medium {
  background-color: #ffab00;
}

.low {
  background-color: #38cbcb;
}

@media (min-width: 768px) {
  .todo-priority-container {
    position: absolute;
    top: 23px;
    right: 20px;
    width: 125px;
    height: 33px;
    border-radius: 500px;
    cursor: pointer;
    color: #ffffff;
  }
  .desktop-priority {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 33px;
    gap: 8px;
  }
  .dropdown-toggle {
    position: absolute;
    justify-content: space-between;
    top: 68px;
    display: flex !important;
    flex-direction: column;
    width: 125px;
    height: 103px;
    background-color: #ffffff;
    border: 2px solid black;
    border-radius: 16px;
  }
  .dropdown {
    display: none;
    gap: 0;
  }

  .todo-priority {
    display: block;
  }
  .priorities {
    background-color: #ffffff;
    width: 100%;
    height: 33px;
    border-radius: 16px;
    font-size: 15px;
    line-height: 15px;
    padding: 0;
    cursor: pointer;
  }
  .selected {
    border: none;
  }
  .dropdown-active {
    border: 2px solid black;
    background-color: #ffffff;
    color: black;
  }
  .arrow-down {
    width: 20px;
    height: 20px;
  }
}
</style>
