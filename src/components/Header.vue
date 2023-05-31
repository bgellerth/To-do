<template>
  <div class="container">
    <h1 class="title">To do list</h1>
    <button @click="addTodo" class="add"><img :src="Addplus" /></button>
  </div>
</template>

<script setup lang="ts">
import Addplus from "../assets/addplus.png";
const emit = defineEmits<{
  (e: "todoAdded"): void;
}>();

function addTodo() {
  emit("todoAdded");
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
  height: 85px;
  left: 415px;
  top: 78px;

  font-family: "Neue Haas Grotesk Display Pro";
  font-style: normal;
  font-weight: 600;
  font-size: 72px;
  line-height: 86px;

  color: #000000;
}

.add {
  width: 60px;
  height: 60px;
  left: 965px;
  top: 91px;
  border-radius: 30px;
  border: none;
  background: #38cb89;
}

@media (max-width: 758px) {
  .title {
    width: 92px;
    height: 26px;
    left: 16px;
    top: 136px;

    font-family: "Neue Haas Grotesk Display Pro";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;

    color: #000000;
  }
  .add {
    width: 32px;
    height: 32px;
    left: 271.38px;
    top: 133px;

    background: #38cb89;
  }
  .container {
    width: 300px;
  }
}
</style>
