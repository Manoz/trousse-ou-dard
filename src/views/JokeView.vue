<template>
  <main>
    <div class="max-w-3xl mx-auto">
      <p
        v-if="currentJoke"
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        {{ currentJoke }}
      </p>

      <p
        v-else
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        Chargement d'une joke lô...
      </p>

      <div class="mx-auto flex items-center justify-center my-8 gap-4">
        <ButtonPrimaryJoke label="Une autre !" @click="displayRandomJoke" />
        <ButtonOutlineJoke label="Ajouter une joke" @click="isModalOpen = true" />
      </div>

      <ModalForm
        :modal-title="'Ajouter une joke'"
        :is-open="isModalOpen"
        custom-focus-class="focus:ring-teal-500"
        @update:is-open="isModalOpen = $event"
      >
        <template #default>
          <label class="block text-sm font-medium leading-6 text-gray-900" for="newJoke">
            Écris ta joke ici tabarnak !
          </label>

          <div class="my-2">
            <input
              id="newJoke"
              v-model="newJoke"
              :disabled="isAddingJoke"
              class="block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              :class="{ 'opacity-50 cursor-not-allowed': isAddingJoke }"
            />
          </div>

          <ButtonPrimaryJoke label="Go OMG !" @click="addNewJoke" :disabled="isAddingJoke" />

          <div
            v-if="displaySuccessMessage"
            class="mt-2 bg-green-100 text-green-600 font-semibold py-1.5 px-2 rounded-sm"
          >
            C'est bon, ta Joke est en d'dans !
          </div>
        </template>
      </ModalForm>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useJokeStore } from '@/stores/jokes'
import ModalForm from '@/components/ModalForm.vue'
import ButtonPrimaryJoke from '@/components/ButtonPrimaryJoke.vue'
import ButtonOutlineJoke from '@/components/ButtonOutlineJoke.vue'

const jokeStore = useJokeStore()
const currentJoke = ref('')
const displayedJokes = ref([])
const newJoke = ref('')
const isModalOpen = ref(false)
const isAddingJoke = ref(false)
const displaySuccessMessage = ref(false)

onMounted(async () => {
  await jokeStore.getJokes()
  displayRandomJoke()
})

const displayRandomJoke = () => {
  // Filter to get only jokes that have not been displayed yet
  const unshownJokes = jokeStore.jokes.filter((joke) => !displayedJokes.value.includes(joke))

  // If all jokes have been displayed, reset the list
  if (unshownJokes.length === 0) {
    displayedJokes.value = []
    jokeStore.getJokes()
    return
  }

  // Get a random joke from the list
  const randomIndex = Math.floor(Math.random() * unshownJokes.length)
  currentJoke.value = unshownJokes[randomIndex]
  displayedJokes.value.push(currentJoke.value)
}

const addNewJoke = () => {
  if (isAddingJoke.value) return

  if (newJoke.value) {
    isAddingJoke.value = true

    jokeStore.addJoke(newJoke.value).then(() => {
      newJoke.value = ''
      isAddingJoke.value = false

      displaySuccessMessage.value = true

      setTimeout(() => {
        displaySuccessMessage.value = false
      }, 3000)
    })
  }
}
</script>
