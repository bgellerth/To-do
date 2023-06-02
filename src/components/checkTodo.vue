<template>
  <div class="status-container">
    <img
      class="unchecked"
      v-if="!checked"
      @click="toggleCheck"
      src="../assets/unchecked.png"
    />
    <div class="checked-todo" v-else @click="toggleCheck">
      <img class="circle" src="../assets/checked.png" />
      <img class="vector" src="../assets/Vector.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(false);

function toggleCheck() {
  checked.value = !checked.value;
  console.log(checked.value);
}
</script>
<style>
.checked-todo {
  position: relative;

  width: 39.39px;
  height: 40.04px;
}
.vector {
  position: absolute;
  top: -5px;
}
.circle {
  position: absolute;
}

@media (max-width: 768px) {
  .status-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .unchecked {
    width: 25px;
    height: 25px;
  }

  .vector,
  .circle {
    width: 25px;
    height: 25px;
  }
}
</style>
