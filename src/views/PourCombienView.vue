<template>
  <main>
    <div class="max-w-3xl mx-auto">
      <p
        v-if="currentPourCombien"
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        Pour combien {{ currentPourCombien }}
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
          @click="displayRandomPourCombien"
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
          <label class="block text-sm font-medium leading-6 text-gray-900" for="newPourCombien">
            Écris ton "Pour combien" ici :
          </label>

          <div class="mb-4 mt-2">
            <input
              id="newPourCombien"
              v-model="newPourCombien"
              :disabled="isAddingPourCombien"
              class="block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
              :class="{ 'opacity-50 cursor-not-allowed': isAddingPourCombien }"
            />
          </div>

          <ButtonPrimary
            bg-class="bg-violet-600"
            focus-class="focus-visible:outline-violet-600"
            label="Go OMG !"
            @click="addNewPourCombien"
            :disabled="isAddingPourCombien"
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
              <li
                class="py-0.5"
                v-for="pourCombien in pourCombienStore.pourCombiens"
                :key="pourCombien"
              >
                <p class="text-gray-900">
                  {{ pourCombien }}
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
import { usePourCombienStore } from '@/stores/pour-combien'
import ModalForm from '@/components/ModalForm.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import ButtonOutline from '@/components/ButtonOutline.vue'

const pourCombienStore = usePourCombienStore()
const currentPourCombien = ref('')
const displayedPourCombiens = ref([])
const newPourCombien = ref('')
const isModalOpen = ref(false)
const isModalAllOpen = ref(false)
const isAddingPourCombien = ref(false)
const displaySuccessMessage = ref(false)

onMounted(async () => {
  await pourCombienStore.getPourCombiens()
  displayRandomPourCombien()
})

const displayRandomPourCombien = () => {
  // Filter to get only PourCombiens that have not been displayed yet
  const unshownPourCombiens = pourCombienStore.pourCombiens.filter(
    (pourCombien) => !displayedPourCombiens.value.includes(pourCombien)
  )

  // If all PourCombiens have been displayed, reset the list
  if (unshownPourCombiens.length === 0) {
    displayedPourCombiens.value = []
    pourCombienStore.getPourCombiens()
    return
  }

  // Get a random PourCombien from the list
  const randomIndex = Math.floor(Math.random() * unshownPourCombiens.length)
  currentPourCombien.value = unshownPourCombiens[randomIndex]
  displayedPourCombiens.value.push(currentPourCombien.value)
}

const addNewPourCombien = () => {
  if (isAddingPourCombien.value) return

  if (newPourCombien.value) {
    isAddingPourCombien.value = true

    pourCombienStore.addPourCombien(newPourCombien.value).then(() => {
      newPourCombien.value = ''
      isAddingPourCombien.value = false

      displaySuccessMessage.value = true

      setTimeout(() => {
        displaySuccessMessage.value = false
      }, 3000)
    })
  }
}
</script>
