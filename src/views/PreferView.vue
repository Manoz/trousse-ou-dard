<template>
  <main>
    <div class="max-w-3xl mx-auto">
      <p
        v-if="currentPrefer"
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        {{ currentPrefer }}
      </p>

      <p
        v-else
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        Chargement d'un "Tu préfères"...
      </p>

      <div class="mx-auto flex items-center justify-center my-8 gap-4">
        <ButtonPrimary
          bg-class="bg-amber-600"
          focus-class="focus-visible:outline-amber-600"
          label="Une autre !"
          @click="displayRandomPrefer"
        />

        <ButtonOutline
          border-class="border-amber-600"
          focus-class="focus-visible:outline-amber-600"
          label='Ajouter un "Tu préfères"'
          @click="isModalOpen = true"
        />
      </div>

      <div class="mx-auto flex items-center justify-center my-8 gap-4">
        <ButtonPrimary
          bg-class="bg-gray-500"
          focus-class="focus-visible:outline-gray-500"
          label='Voir tous les "Tu préfères"'
          @click="isModalAllOpen = true"
        />
      </div>

      <ModalForm
        modal-title='Ajouter un "Tu préfères"'
        :is-open="isModalOpen"
        custom-focus-class="focus:ring-amber-500"
        @update:is-open="isModalOpen = $event"
      >
        <template #default>
          <label class="block text-sm font-medium leading-6 text-gray-900" for="newPrefer">
            Écris ton "Tu préfères" ici :
          </label>

          <div class="mb-4 mt-2">
            <input
              id="newPrefer"
              v-model="newPrefer"
              :disabled="isAddingPrefer"
              class="block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
              :class="{ 'opacity-50 cursor-not-allowed': isAddingPrefer }"
            />
          </div>

          <ButtonPrimary
            bg-class="bg-amber-600"
            focus-class="focus-visible:outline-amber-600"
            label="Go OMG !"
            @click="addNewPrefer"
            :disabled="isAddingPrefer"
          />

          <div
            v-if="displaySuccessMessage"
            class="mt-2 bg-green-100 text-green-600 font-semibold py-1.5 px-2 rounded-sm"
          >
            C'est bon, ton "Tu préfères" a bien été ajouté !
          </div>
        </template>
      </ModalForm>

      <ModalForm
        modal-title='Tous les "Tu préfères"'
        :is-open="isModalAllOpen"
        custom-focus-class="focus:ring-amber-500"
        size="lg"
        @update:is-open="isModalAllOpen = $event"
      >
        <template #default>
          <div class="mb-4 mt-2">
            <ul class="pl-4 list-outside list-disc">
              <li class="py-0.5" v-for="prefer in preferStore.prefers" :key="prefer">
                <p class="text-gray-900">{{ prefer }}</p>
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
import { usePreferStore } from '@/stores/prefer'
import ModalForm from '@/components/ModalForm.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import ButtonOutline from '@/components/ButtonOutline.vue'

const preferStore = usePreferStore()
const currentPrefer = ref('')
const displayedPrefers = ref([])
const newPrefer = ref('')
const isModalOpen = ref(false)
const isModalAllOpen = ref(false)
const isAddingPrefer = ref(false)
const displaySuccessMessage = ref(false)

onMounted(async () => {
  await preferStore.getPrefers()
  displayRandomPrefer()
})

const displayRandomPrefer = () => {
  // Filter to get only Prefers that have not been displayed yet
  const unshownPrefers = preferStore.prefers.filter(
    (prefer) => !displayedPrefers.value.includes(prefer)
  )

  // If all Prefers have been displayed, reset the list
  if (unshownPrefers.length === 0) {
    displayedPrefers.value = []
    preferStore.getPrefers()
    return
  }

  // Get a random Prefer from the list
  const randomIndex = Math.floor(Math.random() * unshownPrefers.length)
  currentPrefer.value = unshownPrefers[randomIndex]
  displayedPrefers.value.push(currentPrefer.value)
}

const addNewPrefer = () => {
  if (isAddingPrefer.value) return

  if (newPrefer.value) {
    isAddingPrefer.value = true

    preferStore.addPrefer(newPrefer.value).then(() => {
      newPrefer.value = ''
      isAddingPrefer.value = false

      displaySuccessMessage.value = true

      setTimeout(() => {
        displaySuccessMessage.value = false
      }, 3000)
    })
  }
}
</script>
