<template>
  <main class="mb-10 sm:mb-0">
    <div class="max-w-4xl mx-auto">
      <p class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light">
        Tu veux faire quoi ?
      </p>

      <div class="mt-10 sm:mt-20">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <HomeCard
            title="Trousse"
            desc="Tu connais Action ou Vérité ? Truth or Dare ? Et bien Trousse c'est uniquement des vérités."
            link="/trousse"
            custom-class="focus-within:ring-sky-600"
          />

          <HomeCard
            title="Joke"
            desc="Des Jokes de Papa, ni plus ni moins. C'est pas à crever de rire mais y'en a des drôles, promis."
            link="/joke"
            custom-class="focus-within:ring-teal-600"
          />

          <HomeCard
            title="Tu préfères"
            desc="Lui il est simple. Tu préfères ça ou ça ? Et tu choisis. C'est con comme moi mais c'est marrant."
            link="/prefer"
            custom-class="focus-within:ring-amber-600"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import HomeCard from '../components/HomeCard.vue'
</script>
