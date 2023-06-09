<template>
  <div v-if="!toDo.isEditing" class="status-container">
    <div
      v-if="!toDo.status"
      class="un-checked"
      @click.stop="toggleCheck(toDo)"
    ></div>
    <div v-else class="checked-todo" @click.stop="toggleCheck(toDo)">
      <div class="circle"></div>
      <img class="vector" src="../assets/Vector.svg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Todotype } from "../Types/toDo";

defineProps<{ toDo: Todotype }>();

function toggleCheck(toDo: Todotype) {
  toDo.status = !toDo.status;
}
</script>
<style scoped>
.status-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.un-checked {
  width: 24px;
  height: 24px;
  border: 4px solid black;
  border-radius: 50%;
}

.circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 4px solid #4fda9b;
}
.vector {
  position: absolute;
  top: -8px;
  left: -1px;
  width: 30px;
  height: 30px;
}
.checked-todo {
  position: relative;
}

@media (min-width: 768px) {
  .un-checked {
    width: 40px;
    height: 40px;
    border: 6px solid black;
  }
  .circle {
    width: 40px;
    height: 40px;

    border: 6px solid #4fda9b;
  }
  .vector {
  top: -5px;
  left: 0px;
  width: 44px;
  height: 35px;
}
}
</style>
