<template>
  <h3 class="text-xl font-semibold text-gray-900
             mb-2">
    Добавить пару
  </h3>

  <div class="flex gap-2">
    <the-select
      v-model="faculty"
      class="rounded-md
             shadow-md">
      <option value="" disabled selected>
        Выберите факультет
      </option>

      <option 
        v-for="(faculty, i) in faculties" :key="i"
        :value="faculty.id">
        {{ faculty.name }}
      </option>     
    </the-select>

    <the-select
      v-model="lesson.groupIds"
      class="rounded-md
             shadow-md"
      multiple>
      <option value="" disabled selected>
        Выберите группы
      </option>

      <option 
        v-for="(group, i) in groups" :key="i"
        :value="group.id">
        {{ `${group.number}-${group.subNumber}` }}
      </option>     
    </the-select>

    <the-select
      v-model.number="lesson.disciplineId"
      class="rounded-md
             shadow-md">
      <option value="" disabled selected>
        Выберите дисциплину
      </option>

      <option 
        v-for="(discipline, i) in disciplines" :key="i"
        :value="discipline.id">
        {{ discipline.name }}
      </option>     
    </the-select>

    <the-select
      v-model.number="lesson.auditoriumId"
      class="rounded-md
             shadow-md">
      <option value="" disabled selected>
        Выберите аудиторию
      </option>

      <option 
        v-for="(auditorium, i) in auditoriums" :key="i"
        :value="auditorium.id">
        {{ auditorium.name }}
      </option>     
    </the-select>

    <the-select
      v-model.number="lesson.teacherId"
      class="rounded-md
             shadow-md">
      <option value="" disabled selected>
        Выберите преподавателя
      </option>

      <option 
        v-for="(teacher, i) in teachers" :key="i"
        :value="teacher.id">
        {{ teacher.name }}
      </option>     
    </the-select>

    <the-select
      v-model="lesson.day"
      class="rounded-md
             shadow-md">
      <option value="" disabled selected>
        Выберите день
      </option>

      <option 
        v-for="(day, i) in dayOptions" :key="i"
        :value="day.value">
        {{ day.text }}
      </option>     
    </the-select>

    <the-select
      v-model="lesson.bellOrdinal"
      class="rounded-md
             shadow-md">
      <option value="" disabled selected>
        Выберите номер пары
      </option>

      <option 
        v-for="(bell, i) in 7" :key="i"
        :value="bell">
        {{ bell }}
      </option>     
    </the-select>
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
      @click="createLesson()"
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
import { useLessons } from '~/composables/lessons'
import { useDisciplines } from '~/composables/disciplines'
import { useAuditoriums } from '~/composables/auditoriums'
import { useTeachers } from '~/composables/teachers'
import { DayType } from '~/models/DayType'

const router = useRouter()

const faculty = ref(1)

const { create } = useLessons()
const { getList: getFaculties, getGroups } = useFaculties()
const { getList: getDisciplines } = useDisciplines()
const { getList: getAuditoriums } = useAuditoriums()
const { getList: getTeachers } = useTeachers()

const { mutate } = create()
const { data: groups } = getGroups(faculty)
const { data: faculties } = getFaculties()
const { data: disciplines } = getDisciplines()
const { data: auditoriums } = getAuditoriums()
const { data: teachers } = getTeachers()

const dayOptions = Object.entries(DayType).map(([key, value]) => ({ value: key, text: value }))

const lesson = ref({
  groupIds: [],
  disciplineId: 0,
  auditoriumId: 0,
  teacherId: 0,
  day: DayType.MONDAY,
  bellOrdinal: 1
})

function createLesson(): void {
  mutate(lesson.value)

  router.back()
}
</script>