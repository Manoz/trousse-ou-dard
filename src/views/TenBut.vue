<template>
  <main>
    <div class="max-w-3xl mx-auto">
      <p
        v-if="currentTen"
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        C'est un 10 mais {{ currentTen }}
      </p>

      <p
        v-else
        class="text-center text-2xl leading-8 sm:text-4xl sm:leading-[3rem] font-light min-h-[170px]"
      >
        Chargement d'un "C’est un 10 mais..."
      </p>

      <div class="mx-auto flex items-center justify-center my-8 gap-4">
        <ButtonPrimary
          bg-class="bg-rose-600"
          focus-class="focus-visible:outline-rose-600"
          label="Une autre !"
          @click="displayRandomTen"
        />

        <ButtonOutline
          border-class="border-rose-600"
          focus-class="focus-visible:outline-rose-600"
          label="Ajouter un &quot;C’est un 10 mais&quot;"
          @click="isModalOpen = true"
        />
      </div>

      <div class="mx-auto flex items-center justify-center my-8 gap-4">
        <ButtonPrimary
          bg-class="bg-gray-500"
          focus-class="focus-visible:outline-gray-500"
          label="Voir tous les &quot;C’est un 10 mais&quot;"
          @click="isModalAllOpen = true"
        />
      </div>

      <ModalForm
        :modal-title="'Ajouter un  &quot;C\'est un 10 mais...&quot;'"
        :is-open="isModalOpen"
        custom-focus-class="focus:ring-teal-500"
        @update:is-open="isModalOpen = $event"
      >
        <template #default>
          <label class="block text-sm font-medium leading-6 text-gray-900" for="newTen">
            Écris ton "C'est un 10 mais..." ici :
          </label>

          <div class="mb-4 mt-2">
            <input
              id="newTen"
              v-model="newTen"
              :disabled="isAddingTen"
              class="block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
              :class="{ 'opacity-50 cursor-not-allowed': isAddingTen }"
            >
          </div>

          <ButtonPrimary
            bg-class="bg-rose-600"
            focus-class="focus-visible:outline-rose-600"
            label="Go OMG !"
            @click="addNewTen"
            :disabled="isAddingTen"
          />

          <div
            v-if="displaySuccessMessage"
            class="mt-2 bg-green-100 text-green-600 font-semibold py-1.5 px-2 rounded-sm"
          >
            C'est bon, ton "C'est un 10 mais..." a bien été ajouté !
          </div>
        </template>
      </ModalForm>

      <ModalForm
        modal-title="Toutes les tens"
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
                v-for="ten in tenStore.tens"
                :key="ten"
              >
                <p class="text-gray-900">
                  {{ ten }}
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
import { useTenStore } from '@/stores/ten-but'
import ModalForm from '@/components/ModalForm.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import ButtonOutline from '@/components/ButtonOutline.vue'

const tenStore = useTenStore()
const currentTen = ref('')
const displayedTens = ref([])
const newTen = ref("C'est un 10 mais ")
const isModalOpen = ref(false)
const isModalAllOpen = ref(false)
const isAddingTen = ref(false)
const displaySuccessMessage = ref(false)

onMounted(async () => {
  await tenStore.getTens()
  displayRandomTen()
})

const displayRandomTen = () => {
  // Filter to get only tens that have not been displayed yet
  const unshownTens = tenStore.tens.filter((ten) => !displayedTens.value.includes(ten))

  // If all tens have been displayed, reset the list
  if (unshownTens.length === 0) {
    displayedTens.value = []
    tenStore.getTens()
    return
  }

  // Get a random ten from the list
  const randomIndex = Math.floor(Math.random() * unshownTens.length)
  currentTen.value = unshownTens[randomIndex]
  displayedTens.value.push(currentTen.value)
}

const addNewTen = () => {
  if (isAddingTen.value) return

  if (newTen.value) {
    isAddingTen.value = true

    tenStore.addTen(newTen.value).then(() => {
      newTen.value = "C'est un 10 mais "
      isAddingTen.value = false

      displaySuccessMessage.value = true

      setTimeout(() => {
        displaySuccessMessage.value = false
      }, 3000)
    })
  }
}
</script>
