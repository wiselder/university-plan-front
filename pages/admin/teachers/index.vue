<template>
  <h3 class="text-xl font-semibold text-gray-900
             mb-2">
    Преподаватели
  </h3>

  <div class="flex flex-col gap-2">
    <div v-for="(teacher, i) in teachers" :key="i"
         class="border border-orange-500
                text-lg font-semibold
                px-3.5 py-2
                rounded-md
                shadow-md">
      {{ teacher.name }}
    </div>
  </div>

  <div class="flex justify-center gap-2">
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

    <nuxt-link :to="'/admin/teachers/create'">
      <the-button
        class="bg-blue-500
               text-gray-50
               rounded-md
               shadow-md
               px-3.5 py-2
               mt-2">
        Создать
      </the-button>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { ref, useRouter } from '#imports'

import { useTeachers } from '~/composables/teachers'

const router = useRouter()

const { getList } = useTeachers()

const pattern = ref('')

const { data: teachers } = getList(pattern.value)
</script>