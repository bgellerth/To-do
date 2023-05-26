<template>
  <div class="container">
    <h1 class="title">To do list</h1>
    <button @click="addTodo" class="Add"><img :src="Addplus" /></button>
  </div>
</template>

<script setup lang="ts">
import Addplus from "../assets/addplus.png";
const emit = defineEmits<{
  (e: "todoAdded", value: string): void;
}>();

function addTodo() {
  emit("todoAdded", "Add-one-todo");
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 610px;
  margin-top: 170px;
  justify-content: space-between;
  align-items: center;
}
.title {
  width: 275px;
  height: 86px;
  left: 415px;
  top: 78.1px;

  font-family: "Neue Haas Grotesk Display Pro";
  font-style: normal;
  font-weight: 600;
  font-size: 72px;
  line-height: 86px;

  color: #000000;
}

.Add {
  width: 59.64px;
  height: 59.64px;
  left: 965.36px;
  top: 91.28px;
  border-radius: 45px;
  border: none;
  background: #38cb89;
}
</style>
