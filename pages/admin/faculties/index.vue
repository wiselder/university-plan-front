<template>
  <h3 class="text-xl font-semibold text-gray-900
             mb-2">
    Факультеты
  </h3>

  <div class="flex flex-col gap-2">
    <div v-for="(faculty, i) in faculties" :key="i"
         class="flex items-center justify-between
                border border-blue-500
                text-lg font-semibold
                px-3.5 py-2
                rounded-md
                shadow-md">
      {{ faculty.name }}

      <nuxt-link :to="`/admin/faculties/${faculty.id}`">
        <the-button
          class="bg-green-500
                 text-gray-50
                 rounded-md
                 shadow-md
                 px-1.5 py-0.5">
          Создать группу
        </the-button>
      </nuxt-link>
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

    <nuxt-link :to="'/admin/faculties/create'">
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
import { useRouter } from '#imports'

import { useFaculties } from '~/composables/faculties'

const router = useRouter()

const { getList } = useFaculties()

const { data: faculties } = getList()
</script>