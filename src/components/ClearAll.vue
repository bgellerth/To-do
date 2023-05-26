
<template>
    <button @click="clearAll">Clear To Do List</button>
  </template>
  
  <script setup lang="ts">


  const emit = defineEmits<{
  (e:  "clearAll", value : string): void
  }>();
  
  function clearAll() {
    emit("clearAll", "clear")  ;
  }
  </script>
  

  
    
    