<template>
  <div class="transition-transform duration-300">
    <RouterLink
      class="flex flex-col items-center h-full rounded-2xl px-4 md:px-6 py-6 sm:py-8 border border-gray-400 bg-white focus-within:ring-2 focus-within:ring-offset-2 hover:border-gray-500 hover:shadow-md outline-none shadow-sm transition duration-200"
      :to="link"
      :class="{
        [customClass]: customClass
      }"
    >
      <p class="text-lg sm:text-xl font-semibold">
        {{ title }}
      </p>

      <p class="mt-4 text-sm sm:text-base">
        {{ desc }}
      </p>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>
