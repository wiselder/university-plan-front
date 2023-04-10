<template>
  <div class="flex justify-center gap-2">
    <nuxt-link :to="'/admin/faculties'">
      <the-button
        class="bg-blue-500
               text-gray-50
               rounded-md
               shadow-md
               px-3.5 py-2
               mt-2">
        Факультеты
      </the-button>
    </nuxt-link>

    <nuxt-link :to="'/admin/auditoriums'">
      <the-button
        class="bg-light-blue-500
               text-gray-50
               rounded-md
               shadow-md
               px-3.5 py-2
               mt-2">
        Аудитории
      </the-button>
    </nuxt-link>

    <nuxt-link :to="'/admin/teachers'">
      <the-button
        class="bg-orange-500
               text-gray-50
               rounded-md
               shadow-md
               px-3.5 py-2
               mt-2">
        Преподаватели
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