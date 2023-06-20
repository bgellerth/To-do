<template>
  <button class="save-button" @click.stop="saveTodo">Save</button>
</template>

<script setup lang="ts">
import type { Todotype } from "../Types/toDo";

const props = defineProps<{
  toDo: Todotype;
}>();

const emit = defineEmits<{
  (e: 'todoSaved', toDo: Todotype): void;
}>();

function saveTodo() {
  emit('todoSaved', props.toDo);
}
</script>

<style scoped>
.save-button {
    width: 60px;
    height: 27px;
    border: 0;
    outline: 0;
    background-color: #38cb89;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    line-height: 17px;
    
  }

@media (min-width: 768px) {
    .save-button{
      width: 120px;
      height: 52px;
      font-size: 18px;
      line-height: 22px;
      border-radius: 16px;
    }

}
</style>
