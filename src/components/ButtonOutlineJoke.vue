<template>
  <button
    type="button"
    class="rounded-md bg-white border border-teal-600 px-3.5 py-2.5 text-sm font-semibold text-base shadow-sm focus-visible:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-colors duration-300"
  >
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>
