<template>
  <div class="max-w-6xl mx-auto px-4 my-4">
    <header class="flex items-center gap-4 mb-16">
      <RouterLink to="/">
        <img class="h-8" src="@/assets/trousse.png" alt="Tu veux jouer ? (aller à l'accueil)" />
      </RouterLink>

      <nav class="ml-6 sm:ml-8 flex gap-6 sm:gap-8 items-center" role="navigation">
        <RouterLink active-class="!text-sky-600 underline" class="nav-link" to="/trousse">
          Trousse
        </RouterLink>

        <RouterLink active-class="!text-teal-600 underline" class="nav-link" to="/joke">
          Jokes
        </RouterLink>

        <RouterLink
          active-class="!text-amber-600 underline"
          class="nav-link cursor-progress !text-gray-400 hover:!no-underline"
          to="/soon"
        >
          Soon
        </RouterLink>
      </nav>
    </header>

    <img class="hidden sm:block h-10 mx-auto mb-6 sm:mb-12" src="@/assets/trousse.png" alt="" />

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.nav-link {
  @apply text-lg text-gray-800 hover:underline;
}
</style>
