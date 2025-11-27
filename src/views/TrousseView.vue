<template>
  <main>
    <div class="max-w-3xl mx-auto">
      <p
        v-if="currentPhrase"
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        {{ currentPhrase }}
      </p>

      <p
        v-else
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        Chargement d'une trousse...
      </p>

      <div class="mx-auto flex items-center justify-center my-8 gap-4">
        <ButtonPrimary
          bg-class="bg-sky-600"
          focus-class="focus-visible:outline-sky-600"
          label="Une autre !"
          @click="displayRandomPhrase"
        />

        <ButtonOutline
          border-class="border-sky-600"
          focus-class="focus-visible:outline-sky-600"
          label="Ajouter une trousse"
          @click="isModalOpen = true"
        />
      </div>

      <div class="mx-auto flex items-center justify-center my-8 gap-4">
        <ButtonPrimary
          bg-class="bg-gray-500"
          focus-class="focus-visible:outline-gray-500"
          label="Voir toutes les trousses"
          @click="isModalAllOpen = true"
        />
      </div>

      <ModalForm
        :modal-title="'Ajouter une trousse'"
        :is-open="isModalOpen"
        custom-focus-class="focus:ring-sky-500"
        @update:is-open="isModalOpen = $event"
      >
        <template #default>
          <label class="block text-sm font-medium leading-6 text-gray-900" for="newPhrase">
            Écris ta trousse ici :
          </label>

          <div class="mb-4 mt-2">
            <input
              id="newPhrase"
              v-model="newPhrase"
              :disabled="isAddingPhrase"
              class="block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              :class="{ 'opacity-50 cursor-not-allowed': isAddingPhrase }"
            >
          </div>

          <ButtonPrimary
            bg-class="bg-sky-600"
            focus-class="focus-visible:outline-sky-600"
            label="Go OMG !"
            @click="addNewPhrase"
            :disabled="isAddingPhrase"
          />

          <div
            v-if="displaySuccessMessage"
            class="mt-2 bg-green-100 text-green-600 font-semibold py-1.5 px-2 rounded-sm"
          >
            C'est bon, ta trousse a été ajoutée !
          </div>
        </template>
      </ModalForm>

      <ModalForm
        modal-title="Toutes les trousses"
        :is-open="isModalAllOpen"
        custom-focus-class="focus:ring-sky-500"
        size="lg"
        @update:is-open="isModalAllOpen = $event"
      >
        <template #default>
          <div class="mb-4 mt-2">
            <ul class="pl-4 list-outside list-disc">
              <li
                class="py-0.5"
                v-for="phrase in phraseStore.phrases"
                :key="phrase"
              >
                <p class="text-gray-900">
                  {{ phrase }}
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
import { ref, onMounted } from 'vue'
import { usePhraseStore } from '@/stores/phrases'
import ModalForm from '@/components/ModalForm.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import ButtonOutline from '@/components/ButtonOutline.vue'

const phraseStore = usePhraseStore()
const currentPhrase = ref('')
const displayedPhrases = ref([])
const newPhrase = ref('')
const isModalOpen = ref(false)
const isModalAllOpen = ref(false)
const isAddingPhrase = ref(false)
const displaySuccessMessage = ref(false)

onMounted(async () => {
  await phraseStore.getPhrases()
  displayRandomPhrase()
})

const displayRandomPhrase = () => {
  // Filter to get only phrases that have not been displayed yet
  const unshownPhrases = phraseStore.phrases.filter(
    (phrase) => !displayedPhrases.value.includes(phrase)
  )

  // If all phrases have been displayed, reset the list
  if (unshownPhrases.length === 0) {
    displayedPhrases.value = []
    phraseStore.getPhrases()
    return
  }

  // Get a random phrase from the list
  const randomIndex = Math.floor(Math.random() * unshownPhrases.length)
  currentPhrase.value = unshownPhrases[randomIndex]
  displayedPhrases.value.push(currentPhrase.value)
}

const addNewPhrase = () => {
  if (isAddingPhrase.value) return

  if (newPhrase.value) {
    isAddingPhrase.value = true

    phraseStore.addPhrase(newPhrase.value).then(() => {
      newPhrase.value = ''
      isAddingPhrase.value = false

      displaySuccessMessage.value = true

      setTimeout(() => {
        displaySuccessMessage.value = false
      }, 3000)
    })
  }
}
</script>
