<template>
  <main>
    <div class="max-w-3xl mx-auto">
      <p class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]">
        {{ phrasesStore.randomPhrase }}
      </p>

      <div class="mx-auto flex items-center justify-center my-8">
        <button type="button" @click="nextPhrase" aria-label="Afficher une autre phrase"
          class="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-300">
          Une autre !
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { usePhrasesStore } from '@/stores/phrases';

const phrasesStore = usePhrasesStore();

phrasesStore.loadPhrases().then(() => {
  phrasesStore.refreshRandomPhrase();
});

const nextPhrase = () => {
  phrasesStore.refreshRandomPhrase();
};
</script>
