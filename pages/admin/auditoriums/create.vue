<template>
  <h3 class="text-xl font-semibold text-gray-900
             mb-2">
    Создать аудиторию
  </h3>

  <div class="flex gap-2">
    <the-input
      v-model="auditorium.address"
      name="address"
      type="text"
      placeholder="Адрес"
      class="grow
             rounded-md 
             shadow-md"/>

    <the-input
      v-model="auditorium.name"
      name="name"
      type="text"
      placeholder="Название"
      class="grow
             rounded-md 
             shadow-md"/>
  </div>

  <div class="flex gap-2 justify-center">
    <the-button
      @click="router.back()"
      class="bg-gray-500
             text-gray-50
             rounded-md
             shadow-md
             px-3.5 py-2
             mt-2">
      Назад
    </the-button>

    <the-button
      @click="createAuditorium()"
      class="bg-blue-500
             text-gray-50
             rounded-md
             shadow-md
             px-3.5 py-2
             mt-2">
      Создать
    </the-button>
  </div>
</template>

<script setup lang="ts">
import { ref, useRouter } from '#imports'

import { useAuditoriums } from '~/composables/auditoriums'

const router = useRouter()

const { create } = useAuditoriums()
const { mutate } = create()

const auditorium = ref({
  address: '',
  name: ''
})

function createAuditorium(): void {
  mutate(auditorium.value)

  router.back()
}
</script>