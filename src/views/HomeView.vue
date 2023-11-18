<template>
  <main>
    <div class="max-w-3xl mx-auto">
      <p class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light">
        Tu veux faire quoi ?
      </p>

      <div class="mt-20">
        <div class="grid grid-cols-1 gap-0.5 text-center sm:grid-cols-3">
          <RouterLink
            to="/trousse"
            class="home-link bg-primaryTrousse focus-visible:outline-primaryTrousse text-gray-600 hover:text-white rounded-tl-xl rounded-tr-xl sm:rounded-tl-2xl sm:rounded-bl-2xl sm:rounded-tr-none sm:rounded-br-none"
          >
            Trousse
          </RouterLink>

          <RouterLink
            to="/joke"
            class="home-link bg-primaryJokes focus-visible:outline-primaryJokes text-gray-600 hover:text-gray-800"
          >
            Joke
          </RouterLink>

          <RouterLink
            to="/#"
            class="home-link bg-primarySoon focus-visible:outline-primarySoon text-gray-600 hover:text-white rounded-tr-none sm:rounded-tr-2xl rounded-br-xl sm:rounded-br-2xl rounded-bl-xl sm:rounded-bl-none"
          >
            Soon
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home-link {
  @apply flex flex-col px-6 py-8 font-semibold text-xl transition-colors duration-200 bg-opacity-40 hover:bg-opacity-100;
}
</style>
