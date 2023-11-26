<template>
  <main>
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
            title="Soon"
            desc="Lui, il arrive bientôt... le temps de générer ce qu'il faut. Mais promis ça devrait être assez marrant."
            link="/soon"
            :soon="true"
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
