<template>
  <div class="max-w-4xl mx-auto px-4">
    <header class="flex items-center gap-4 mb-16 mt-4">
      <RouterLink to="/">
        <img class="h-12 sm:h-16" src="@/assets/trousse.png" alt="" />
      </RouterLink>

      <nav class="ml-auto flex gap-4 items-center" role="navigation">
        <RouterLink
          class="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200"
          to="/trousse"
          >Trousse</RouterLink
        >

        <RouterLink
          class="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200"
          to="/joke"
        >
          Jokes
        </RouterLink>

        <RouterLink
          class="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200"
          to="/#"
        >
          Soon</RouterLink
        >
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
