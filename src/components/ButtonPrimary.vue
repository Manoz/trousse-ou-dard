<template>
  <button
    type="button"
    class="rounded-md border border-transparent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-300"
    :class="{
      [bgClass]: bgClass,
      [focusClass]: focusClass,
      'opacity-50 cursor-not-allowed': disabled
    }"
  >
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  bgClass: {
    type: String,
    default: ''
  },
  focusClass: {
    type: String,
    default: ''
  }
})
</script>
