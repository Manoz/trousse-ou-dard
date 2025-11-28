<template>
  <main>
    <div class="max-w-3xl mx-auto">
      <p
        v-if="currentHowMuch"
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        Pour combien {{ currentHowMuch }}
      </p>

      <p
        v-else
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        Chargement d'un "Pour combien"...
      </p>

      <div class="mx-auto flex items-center justify-center my-8 gap-4">
        <ButtonPrimary
          bg-class="bg-violet-600"
          focus-class="focus-visible:outline-violet-600"
          label="Une autre !"
          @click="displayRandomHowMuch"
        />

        <ButtonOutline
          border-class="border-violet-600"
          focus-class="focus-visible:outline-violet-600"
          label='Ajouter un "Pour combien"'
          @click="isModalOpen = true"
        />
      </div>

      <div class="mx-auto flex items-center justify-center my-8 gap-4">
        <ButtonPrimary
          bg-class="bg-gray-500"
          focus-class="focus-visible:outline-gray-500"
          label='Voir tous les "Pour combien"'
          @click="isModalAllOpen = true"
        />
      </div>

      <ModalForm
        modal-title='Ajouter un "Pour combien"'
        :is-open="isModalOpen"
        custom-focus-class="focus:ring-violet-500"
        @update:is-open="isModalOpen = $event"
      >
        <template #default>
          <label class="block text-sm font-medium leading-6 text-gray-900" for="newHowMuch">
            Écris ton "Pour combien" ici :
          </label>

          <div class="mb-4 mt-2">
            <input
              id="newHowMuch"
              v-model="newHowMuch"
              :disabled="isAddingHowMuch"
              class="block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
              :class="{ 'opacity-50 cursor-not-allowed': isAddingHowMuch }"
            />
          </div>

          <ButtonPrimary
            bg-class="bg-violet-600"
            focus-class="focus-visible:outline-violet-600"
            label="Go OMG !"
            @click="addNewHowMuch"
            :disabled="isAddingHowMuch"
          />

          <div
            v-if="displaySuccessMessage"
            class="mt-2 bg-green-100 text-green-600 font-semibold py-1.5 px-2 rounded-sm"
          >
            C'est bon, ton "Pour combien" a bien été ajouté !
          </div>
        </template>
      </ModalForm>

      <ModalForm
        modal-title='Tous les "Pour combien"'
        :is-open="isModalAllOpen"
        custom-focus-class="focus:ring-violet-500"
        size="lg"
        @update:is-open="isModalAllOpen = $event"
      >
        <template #default>
          <div class="mb-4 mt-2">
            <ul class="pl-4 list-outside list-disc">
              <li class="py-0.5" v-for="howMuch in howMuchs" :key="howMuch">
                <p class="text-gray-900">
                  {{ howMuch }}
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
const currentHowMuch = ref('')
const displayedHowMuchs = ref([])
const newHowMuch = ref('')
const isModalOpen = ref(false)
const isModalAllOpen = ref(false)
const isAddingHowMuch = ref(false)
const displaySuccessMessage = ref(false)

const howMuchs = computed(() => gameStore.getGameContent('howMuch'))

onMounted(async () => {
  await gameStore.loadGameContent('howMuch')
  displayRandomHowMuch()
})

const displayRandomHowMuch = () => {
  // Filter to get only HowMuchs that have not been displayed yet
  const unshownHowMuchs = howMuchs.value.filter(
    (howMuch) => !displayedHowMuchs.value.includes(howMuch)
  )

  // If all HowMuchs have been displayed, reset the list
  if (unshownHowMuchs.length === 0) {
    displayedHowMuchs.value = []
    gameStore.loadGameContent('howMuch')
    return
  }

  // Get a random HowMuch from the list
  const randomIndex = Math.floor(Math.random() * unshownHowMuchs.length)
  currentHowMuch.value = unshownHowMuchs[randomIndex]
  displayedHowMuchs.value.push(currentHowMuch.value)
}

const addNewHowMuch = () => {
  if (isAddingHowMuch.value) return

  if (newHowMuch.value) {
    isAddingHowMuch.value = true

    gameStore.addGameContent('howMuch', newHowMuch.value).then(() => {
      newHowMuch.value = ''
      isAddingHowMuch.value = false

      displaySuccessMessage.value = true

      setTimeout(() => {
        displaySuccessMessage.value = false
      }, 3000)
    })
  }
}
</script>
