<template>
  <button
    @click="emit('click')"
    type="button"
    class="text-center font-medium
           flex justify-center">
    <slot/>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>