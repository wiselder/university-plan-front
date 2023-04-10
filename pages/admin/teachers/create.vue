<template>
  <h3 class="text-xl font-semibold text-gray-900
             mb-2">
    Создать преподавателя
  </h3>

  <div class="flex gap-2">
    <the-input
      v-model="name"
      name="name"
      type="text"
      placeholder="ФИО"
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
      @click="createTeacher()"
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

import { useTeachers } from '~/composables/teachers'

const router = useRouter()

const { create } = useTeachers()
const { mutate } = create()

const name = ref('')

function createTeacher(): void {
  mutate({ name: name.value })

  router.back()
}
</script>