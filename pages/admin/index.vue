<template>
  <div class="flex justify-center gap-2">
    <nuxt-link 
      v-for="(button, i) in buttons"
      :to="button.path">
      <the-button
        :class="button.color"
        class="text-gray-50
               rounded-md
               shadow-md
               px-3.5 py-2
               mt-2">
        {{ button.text }}
      </the-button>
    </nuxt-link>

    <nuxt-link :to="'/'">
      <the-button
        class="bg-green-500
               text-gray-50
               rounded-md
               shadow-md
               px-3.5 py-2
               mt-2">
        На главную
      </the-button>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const buttons = [{
  text: 'Факультеты',
  color: 'bg-blue-500',
  path: '/admin/faculties'
}, {
  text: 'Аудитории',
  color: 'bg-light-blue-500',
  path: '/admin/auditoriums'
}, {
  text: 'Преподаватели',
  color: 'bg-orange-500',
  path: '/admin/teachers'
}, {
  text: 'Дисциплины',
  color: 'bg-violet-500',
  path: '/admin/disciplines'
}]
</script>