<template>
  <form class="max-w-2xl mx-auto flex items-center justify-center gap-4 flex-col" @submit.prevent="submitPhrase">
    <input class="w-full p-4 focus:ring-primary focus:border-primary" type="text" v-model="newPhrase"
      placeholder="Ajoute une nouvelle phrase" />
    <button type="submit"
      class="w-full rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-300">Envoyer
      OMG !</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { usePhrasesStore } from '@/stores/phrases';

const newPhrase = ref('');
const phrasesStore = usePhrasesStore();

const submitPhrase = () => {
  if (newPhrase.value === '') {
    return;
  }

  phrasesStore.addPhrase(newPhrase.value);
  newPhrase.value = '';
};
</script>
