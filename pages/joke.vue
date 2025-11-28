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
        <ButtonPrimary
          bg-class="bg-teal-600"
          focus-class="focus-visible:outline-teal-600"
          label="Une autre !"
          @click="displayRandomJoke"
        />

        <ButtonOutline
          border-class="border-teal-600"
          focus-class="focus-visible:outline-teal-600"
          label="Ajouter une joke"
          @click="isModalOpen = true"
        />
      </div>

      <div class="mx-auto flex items-center justify-center my-8 gap-4">
        <ButtonPrimary
          bg-class="bg-gray-500"
          focus-class="focus-visible:outline-gray-500"
          label="Voir toutes les jokes"
          @click="isModalAllOpen = true"
        />
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

          <div class="mb-4 mt-2">
            <input
              id="newJoke"
              v-model="newJoke"
              :disabled="isAddingJoke"
              class="block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              :class="{ 'opacity-50 cursor-not-allowed': isAddingJoke }"
            />
          </div>

          <ButtonPrimary
            bg-class="bg-teal-600"
            focus-class="focus-visible:outline-teal-600"
            label="Go OMG !"
            @click="addNewJoke"
            :disabled="isAddingJoke"
          />

          <div
            v-if="displaySuccessMessage"
            class="mt-2 bg-green-100 text-green-600 font-semibold py-1.5 px-2 rounded-sm"
          >
            C'est bon, ta Joke est en d'dans !
          </div>
        </template>
      </ModalForm>

      <ModalForm
        modal-title="Toutes les jokes"
        :is-open="isModalAllOpen"
        custom-focus-class="focus:ring-sky-500"
        size="lg"
        @update:is-open="isModalAllOpen = $event"
      >
        <template #default>
          <div class="mb-4 mt-2">
            <ul class="pl-4 list-outside list-disc">
              <li class="py-0.5" v-for="joke in jokes" :key="joke">
                <p class="text-gray-900">
                  {{ joke }}
                </p>
              </li>
            </ul>
          </div>
        </template>
      </ModalForm>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useGameStore } from '@/stores/games'
import ModalForm from '@/components/ModalForm.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import ButtonOutline from '@/components/ButtonOutline.vue'

const gameStore = useGameStore()
const currentJoke = ref('')
const displayedJokes = ref([])
const newJoke = ref('')
const isModalOpen = ref(false)
const isModalAllOpen = ref(false)
const isAddingJoke = ref(false)
const displaySuccessMessage = ref(false)

const jokes = computed(() => gameStore.getGameContent('joke'))

onMounted(async () => {
  await gameStore.loadGameContent('joke')
  displayRandomJoke()
})

const displayRandomJoke = () => {
  // Filter to get only jokes that have not been displayed yet
  const unshownJokes = jokes.value.filter((joke) => !displayedJokes.value.includes(joke))

  // If all jokes have been displayed, reset the list
  if (unshownJokes.length === 0) {
    displayedJokes.value = []
    gameStore.loadGameContent('joke')
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

    gameStore.addGameContent('joke', newJoke.value).then(() => {
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
