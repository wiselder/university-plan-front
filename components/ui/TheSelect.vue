<template>
  <select 
    v-model="selected"
    :multiple="multiple"
    class="bg-gray-100
          border border-gray-600 focus:border-green-500
           text-base text-gray-900 placeholder:text-gray-500
           px-3 py-2
           focus:outline outline-1 outline-green-600">
    <slot/>
  </select>
</template>

<script setup lang="ts">
import { ref, watch } from '#imports'

const props = defineProps<{
  modelValue?: any
  multiple?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', selected: any): void
}>()

const selected = ref(props.modelValue)

watch(selected, (newValue, oldValue) => {
  if (oldValue === newValue) {
    return
  }

  emit('update:modelValue', selected.value)
})
</script>