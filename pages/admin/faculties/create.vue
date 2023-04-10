<template>
  <h3 class="text-xl font-semibold text-gray-900
             mb-2">
    Создать факультет
  </h3>

  <div class="flex gap-2">
    <the-input
      v-model="name"
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
      @click="createFaculty()"
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

import { useFaculties } from '~/composables/faculties'

const router = useRouter()

const { create } = useFaculties()
const { mutate } = create()

const name = ref()

function createFaculty(): void {
  mutate({ name: name.value })

  router.back()
}
</script>