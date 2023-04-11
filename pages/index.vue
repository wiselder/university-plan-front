<template>
  <div class="flex gap-2">
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
      v-if="isTeacher"
      v-model.number="teacherId"
      class="rounded-md
             shadow-md">
      <option value="" disabled selected>
        Выберите преподавателя
      </option>

      <option 
        v-for="(teacher, i) in teachers" :key="i"
        :value="teacher?.id">
        {{ teacher.name }}
      </option>     
    </the-select>

    <div v-else class="flex gap-2">
      <the-select
        v-model="faculty"
        class="rounded-md
              shadow-md">
        <option value="" disabled selected>
          Выберите факультет
        </option>

        <option 
          v-for="(faculty, i) in faculties" :key="i"
          :value="faculty?.id">
          {{ faculty.name }}
        </option>     
      </the-select>

      <the-select
        v-model="groupId"
        class="rounded-md
               shadow-md">
        <option value="" disabled selected>
          Выберите группу
        </option>

        <option 
          v-for="(group, i) in groups" :key="i"
          :value="group?.id">
          {{ `${group?.number}-${group?.subNumber}` }}
        </option>     
      </the-select>
    </div>

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

    <the-select
      v-if="selectedTime == 'день'"
      v-model="day"
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
  </div>

  <table class="w-full 
                mt-3 
                shadow-md
                border border-gray-600">
    <thead>
      <tr>
        <th/>
        <th v-for="(day, i) in dayOptions" :key="i" 
            class="border border-gray-600">
          {{ day.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(time, i) in bells" :key="i">
        <td class="text-center">
          {{ `${time.start}-${time.finish}` }}
        </td>
        <td v-for="(day, i) in dayOptions" :key="i" class="border border-gray-600">
          <!--<div v-if="getLesson(day, time)">
            <p>{{ getLesson(day, time).lesson.discipline.name }}</p>
            <p>{{ getLesson(day, time).lesson.teacher.name }}</p>
            <p>{{ getLesson(day, time).lesson.auditorium.name }}</p>
          </div>-->
        </td>
      </tr>
    </tbody>
  </table>

  <div class="flex justify-center gap-2">
    <the-button
      @click="search()"
      class="bg-green-500
             text-gray-50
             rounded-md
             shadow-md
             px-3.5 py-2
             mt-2">
      Искать
    </the-button>

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

  {{ teacherWeekPlan }}
  {{ teacherDayPlan }}
</template>

<script setup lang="ts">
import { ref, computed } from '#imports'

import { useFaculties } from '~/composables/faculties'
import { useTeachers } from '~/composables/teachers'
import { usePlans } from '~/composables/plans'
import { Bell } from '~/models/Bell'
import { DayType } from '~/models/DayType'

const selectedTime = ref()
const selectedEntity = ref()

const times = ['день', 'неделя']
const entities = ['преподаватель', 'группа']

const dayOptions = Object.entries(DayType).map(([key, value]) => ({ value: key, text: value }))
const isTeacher = computed(() => selectedEntity.value === 'преподаватель')
const faculty = ref(0)
const teacherId = ref(0)
const groupId = ref(1)
const data = ref()
const day = ref()

const { getList: getTeachers } = useTeachers()
const { getList: getFaculties, getGroups } = useFaculties()
const { findByTeacherWeek, findByTeacherDay, 
        findByGroupWeek, findByGroupDay, getBells } = usePlans()

const { data: bells } = getBells()
const { data: teachers } = getTeachers()
const { data: faculties } = getFaculties()
const { data: groups } = getGroups(faculty)

const teacherDayPlanRequest = computed(() => { 
  return {
    day: day.value,
    teacherId: teacherId.value 
  }
})

const { data: teacherWeekPlan } = findByTeacherWeek(teacherId)
const { data: teacherDayPlan } = findByTeacherDay(teacherDayPlanRequest.value)

function search(): void {
  if (isTeacher.value && selectedTime.value == 'день') {
    data.value = teacherDayPlan.value
  }

  if (isTeacher.value && selectedTime.value === 'неделя') {    
    data.value = teacherWeekPlan.value

    console.log(`data: ${data.value}`)
  }

  /*if (selectedEntity.value == 'преподаватель' && selectedTime.value == 'день') {
    data.value = findByTeacherDay()
  }*/

  if (selectedEntity.value == 'преподаватель' && selectedTime.value == 'неделя') {
    //data.value = findByTeacherWeek()
  }
}

function getLesson(day: DayType, time: Bell) {
  return data.value
}

/*
    getLesson(day, time) {
      if (this.schedule && this.schedule.lessons) {
        return this.schedule.lessons.find(lesson => lesson.lesson.day === day && lesson.lesson.bell.start.hour === parseInt(time.split(':')[0]))
      }
    }*/

function getBellByOrdinal(ordinal: number): Bell | undefined {
  return bells.value?.find((bell) => bell.ordinal == ordinal)
}

/* findByTeacherWeek, findByTeacherDay,
   findByGroupWeek, findByGroupDay,
   getBells*/
</script>