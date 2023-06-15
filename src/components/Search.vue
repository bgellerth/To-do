<template>
  <div class="searchbar">
    <div class="search-field">
      <img :src="SearchIcon" class="search-icon" />
      <input
        class="search-input"
        type="text"
        model="searchQuery"
        input="handleSearch"
        placeholder="Search todos..."
      />
      <button click="performSearch" type="button" class="search-btn">
        Search
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "../assets/SearchIcon.svg";
</script>

<style scoped>
.searchbar {
  display: flex;
}
.search-input {
  box-sizing: border-box;
  border: none;
  outline: 0;
}
.search-field {
  gap: 10px;
  display: flex;
  align-items: center;
  border: 2px solid #040415;
  border-radius: 8px;
  height: 47px;
  padding: 0 9px;
}
.search-btn {
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  gap: 10px;
  border: none;
  width: 68px;
  height: 32px;
  left: 210px;
  top: 7.73px;
  color: #ffff;
  background: #000000;
  border-radius: 8px;
}
.search-icon {
  width: 15px;
  height: 15px;
}

@media (min-width: 768px) {
  .search-field {
    width: 600px;
    height: 67.87px;
    border-radius: 16px;
    justify-content: space-between;
    padding: 0 30px;
  }
  .search-input {
    flex-grow: 1;
    width: 117px;
    height: 22px;

    font-family: "Neue Haas Grotesk Display Pro";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
  }
  .search-btn {
    width: 74px;

    left: 916px;
    top: 216.83px;
  }
  .search-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
