<template>
  <div class="max-w-4xl mx-auto px-4">
    <header class="flex items-center gap-4 mb-16 mt-4">
      <RouterLink to="/">
        <img class="h-12 sm:h-16" src="@/assets/trousse.png" alt="" />
      </RouterLink>

      <!-- <nav class="ml-auto flex gap-4 items-center" role="navigation">
        <RouterLink class="nav-link" to="/add">Ajouter</RouterLink>
      </nav> -->
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.nav-link {
  @apply text-primary hover:text-rose-800 hover:underline;
}
</style>
