<template>
  <main>
    <div class="max-w-3xl mx-auto">
      <p
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        {{ jokesStore.randomJoke }}
      </p>

      <div class="mx-auto flex items-center justify-center my-8">
        <button
          type="button"
          @click="nextJoke"
          aria-label="Afficher une autre Joke"
          class="rounded-md bg-primaryJokes px-3.5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryJokes transition-colors duration-300"
        >
          Une autre !
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useJokesStore } from '@/stores/jokes'

const jokesStore = useJokesStore()

jokesStore.loadJokes().then(() => {
  jokesStore.refreshRandomJoke()
})

const nextJoke = () => {
  jokesStore.refreshRandomJoke()
}
</script>
