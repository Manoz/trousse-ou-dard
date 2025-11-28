<template>
  <button
    type="button"
    class="rounded-md bg-white border px-3.5 py-2.5 text-sm font-semibold text-base shadow-sm focus-visible:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-300"
    :class="{
      [borderClass]: borderClass,
      [focusClass]: focusClass
    }"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  borderClass: {
    type: String,
    default: ''
  },
  focusClass: {
    type: String,
    default: ''
  }
})
</script>
