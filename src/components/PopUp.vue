<template>
  <div class="alert">
    <div class="content-container">
      <p>You can cancel authorization at any time.</p>
      <div class="cancel-delete-btn">
        <button class="delete-btn" @click="removeTodo">Delete</button>
        <button class="cancel-btn" @click="togglePopup">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ index: number }>();
const emit = defineEmits<{
  (e: 'removeTodo', index: number): void;
  (e: 'togglePopup'): void;
}>();

function togglePopup() {
  emit('togglePopup');
}

function removeTodo() {
  emit('removeTodo', props.index);
}
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
}
.alert {
  height: 200px;
  width: 250px;
  border: 3px solid grey;
  background-color: #ffff;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.cancel-delete-btn {
  display: flex;
  flex-direction: row;
  gap: 50px;
  margin-top: 1rem;
}
.delete-btn {
  background-color: #b62727 !important;
  color: #e5e5e5;
}
.cancel-btn,
.delete-btn {
  font-size: 14px;
  font-weight: 600px;
  line-height: 17px;
  width: 69px;
  height: 27px;
  border-radius: 8px;
  border: 0;
  outline: 0;
  background-color: #38cb89;
  padding: 5px 15px;
  color: white;
}
</style>
