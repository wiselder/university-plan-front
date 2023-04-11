<template>
  <div class="flex gap-2">
    <the-input
      v-model="pattern"
      name="pattern"
      type="text"
      placeholder="ФИО"
      class="grow
              rounded-md 
              shadow-md"/>

    <the-select
      v-model="selectedEntity"
      class="rounded-md
             shadow-md">
      <option value="" disabled selected>
        Преподаватель или группа
      </option>

      <option 
        v-for="(entity, i) in entities" :key="i"
        :value="entity">
        {{ entity }}
      </option>     
    </the-select>

    <the-select
      v-model="selectedTime"
      class="rounded-md
             shadow-md"> 
      <option value="" disabled selected>
        Выберите период
      </option>

      <option 
        v-for="(timeType, i) in times" :key="i"
        :value="timeType">
        {{ timeType }}
      </option>      
    </the-select>
  </div>

  <div class="flex justify-center gap-2">
    <nuxt-link :to="'/admin/lessons/create'">
      <the-button
        class="bg-lime-500
               text-gray-50
               rounded-md
               shadow-md
               px-3.5 py-2
               mt-2">
        Добавить пару
      </the-button>
    </nuxt-link>

    <nuxt-link :to="'/admin'">
      <the-button
        class="bg-red-500
              text-gray-50
              rounded-md
              shadow-md
              px-3.5 py-2
              mt-2">
        Панель администратора
      </the-button>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'

import { useTeachers } from '~/composables/teachers'

const pattern = ref()
const selectedTime = ref()
const selectedEntity = ref()

const times = ['день', 'неделя']
const entities = ['преподаватель', 'группа']

const { getList: getTeachers } = useTeachers()

const { isLoading: isResourcesLoading, data: teachers } = getTeachers(pattern.value)
</script>