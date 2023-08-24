<template>
  <div
    class="bg-gradient-to-r from-cyan-500 to-lime-500 min-h-screen flex justify-center items-center"
  >
    <div class="w-96 p-8 bg-green-200 rounded-lg shadow-md">
      <p class="text-4xl flex justify-center">To-Do</p>
      <h1 class="text-2xl font-semibold mb-4">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-600 font-semibold mb-1" for="username"
            >Username/E-mail</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-600 font-semibold mb-1" for="password"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none"
          >
            Login
          </button>
        </div>
        <div class="flex justify-center flex-col items-center mt-9">
          <p class="">Don't have an account</p>
          <router-link to="/signup" class=" text-center w-full px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none">Sign Up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script></script>

