<template>
  <div
    class="transition-transform duration-300"
    @mouseover="avoidCursor"
    @mouseleave="resetPosition"
    :title="soon && 'Ouais l\'animation est à chier... déso'"
  >
    <RouterLink
      class="flex flex-col items-center h-full rounded-2xl px-4 md:px-6 py-6 sm:py-8 border border-gray-400 bg-white focus-within:ring-2 focus-within:ring-amber-600 focus-within:ring-offset-2 hover:border-gray-500 hover:shadow-md outline-none shadow-sm transition duration-200"
      :to="link"
      :class="{
        'text-gray-400 border-gray-200 hover:border-gray-200 hover:shadow-sm cursor-progress':
          props.soon
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
  soon: {
    type: Boolean,
    default: false
  }
})

const avoidCursor = (event) => {
  if (!props.soon) return

  const card = event.currentTarget
  const randomPositionTop = Math.floor(Math.random() * 400)
  const randomPositionRight = Math.floor(Math.random() * 600)
  const randomPositionBottom = Math.floor(Math.random() * 400)
  const randomPositionLeft = Math.floor(Math.random() * 600)

  card.style.transform = `matrix(1, 0, 0, 1, ${randomPositionRight - randomPositionLeft}, ${
    randomPositionBottom - randomPositionTop
  })`
}

const resetPosition = (event) => {
  if (!props.soon) return

  setTimeout(() => {
    event.target.style.transform = 'none'
  }, 4000)
}
</script>
