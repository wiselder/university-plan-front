<template>
  <div class="flex flex-col gap-2
              border border-blue-500
              text-lg font-semibold
              px-3.5 py-2
              rounded-md
              shadow-md">
    <div class="flex items-center justify-between">
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

    <div>
      <h3 class="text-xl font-semibold text-gray-900
                 mb-2">
        Группы
      </h3>

      <div v-for="(group, i) in groups" :key="i"
           class="bg-blue-100
                  px-1.5 py-0.5
                  rounded-md">
        {{ `${group.number}-${group.subNumber}` }}
        Курс: {{ group.course }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFaculties } from '~/composables/faculties'
import { Faculty } from '~/models/Faculty'

const props = defineProps<{
  faculty: Faculty
}>()

const { getGroups } = useFaculties()

const { data: groups } = getGroups(props.faculty.id)
</script>