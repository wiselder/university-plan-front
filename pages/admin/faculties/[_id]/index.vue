<template>
  <h3 class="text-xl font-semibold text-gray-900
             mb-2">
    Создать группу
  </h3>

  <div class="flex gap-2">
    <the-input
      v-model="group.course"
      name="course"
      type="number"
      placeholder="Курс"
      class="grow
              rounded-md 
              shadow-md"/>

    <the-input
      v-model="group.number"
      name="number"
      type="number"
      placeholder="Номер"
      class="grow
            rounded-md 
            shadow-md"/>

    <the-input
      v-model="group.subNumber"
      name="subNumber"
      type="number"
      placeholder="Подгруппа"
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
      @click="createGroup()"
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
import { ref, useRoute, useRouter } from '#imports'

import { useFaculties } from '~/composables/faculties'

const router = useRouter()
const route = useRoute()

const { addGroup } = useFaculties()

const group = ref({
  course: undefined,
  number: undefined,
  subNumber: undefined
})

const { mutate } = addGroup()

function createGroup(): void {
  mutate({ 
    subNumber: group.value.subNumber ?? 0,
    number: group.value.number ?? 0,
    course: group.value.number ?? 0,
    id: Number(route.params._id) 
  })

  router.back()
}
</script>