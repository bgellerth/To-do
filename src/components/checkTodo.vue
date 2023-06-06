<template>
  <div class="status-container">
    <div class="unchecked" v-if="!checked" @click="toggleCheck"></div>
    <div class="checked-todo" v-else @click="toggleCheck">
      <div class="circle"></div>
      <img class="vector" src="../assets/Vector.svg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(false);

function toggleCheck() {
  checked.value = !checked.value;

}
</script>
<style>
.checked-todo {
  position: relative;

  width: 40px;
  height: 40px;
}
.vector {
  position: absolute;
  top: -5px;
}
.circle {
  position: absolute;
  border: 6px solid #4fda9b;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.unchecked {
  border: 6px solid black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
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
