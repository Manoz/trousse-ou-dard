<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog
      as="div"
      class="relative z-10"
      @close="closeModal"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:p-6"
              :class="{
                'sm:max-w-lg': size === 'md',
                'sm:max-w-3xl': size === 'lg'
              }"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4 block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  :class="{
                    [customFocusClass]: customFocusClass
                  }"
                  @click="closeModal"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div class="mt-3 sm:mt-0">
                <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                  {{ modalTitle }}
                </DialogTitle>

                <div class="mt-6 max-h-[80vh] overflow-x-auto">
                  <slot />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  modalTitle: {
    type: String,
    required: true
  },
  customFocusClass: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md'
  }
})

const emit = defineEmits(['update:isOpen'])

const closeModal = () => {
  emit('update:isOpen', false)
}
</script>
