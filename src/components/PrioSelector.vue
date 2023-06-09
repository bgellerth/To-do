<template>
  <select
    class="todo-priority high"
    @change="handlePriorityChange"
    ref="priority"
  >
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </select>
</template>
<script setup lang="ts">
function handlePriorityChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const priority = target.value;

  target.classList.remove("high", "medium", "low");
  target.classList.add(priority);
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

  select {
    appearance: none;
  }
}
</style>
