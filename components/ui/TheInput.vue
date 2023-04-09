<template>
  <input
    @input="onInput($event)"
    :value="text"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    ref="input"
    class="text-base text-gray-900 placeholder:text-gray-500
           bg-gray-100
           px-3 py-2
           border border-gray-600 focus:border-green-600 
           focus:outline outline-1 outline-green-600"/>
</template>

<script setup lang="ts">
import { ref } from '#imports'

import isUndefined from 'lodash/isUndefined'

const props = defineProps<{
  name: string
  type: string
  placeholder?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const text = ref(props.modelValue)
const input = ref()

function onInput(event: Event): void {
  let value = (event.target as HTMLInputElement)?.value

  if (isUndefined(value)) {
    return
  }

  text.value = value

  emit('update:modelValue', text.value)
}
</script>