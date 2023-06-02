<template>
  <div class="container">
    <div class="header">
      <h1 class="title">To do list</h1>
      <button @click="addTodo" class="add"><img :src="Addplus" /></button>
    </div>
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
  max-width: 600px;
  flex-direction: column;
  width: 600px;
  margin: 32px auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  margin: 0px;
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
  border-radius: 30px;
  border: none;
  background: #38cb89;
}

@media (max-width: 758px) {
  .title {
    font-size: 24px;
  }
  .add {
    width: 32px;
    height: 32px;
    left: 271.38px;
    top: 133px;
  }
  .container {
    max-width: 300px;
  }
}
</style>
