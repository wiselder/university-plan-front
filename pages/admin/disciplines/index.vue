<template>
  <h3 class="text-xl font-semibold text-gray-900
             mb-2">
    Дисциплины
  </h3>

  <div class="flex flex-col gap-2">
    <div v-for="(discipline, i) in disciplines" :key="i"
         class="border border-violet-500
                text-lg font-semibold
                px-3.5 py-2
                rounded-md
                shadow-md">
      {{ discipline.name }}
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

    <nuxt-link :to="'/admin/disciplines/create'">
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

import { useDisciplines } from '#imports'

const router = useRouter()

const { getList } = useDisciplines()

const { data: disciplines } = getList()
</script>