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
        v-for="(dayType, i) in dayOptions" :key="i"
        :value="dayType.value">
        {{ dayType?.text }}
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
        <th v-for="(dayType, i) in dayOptions" :key="i" 
            class="border border-gray-600">
          {{ dayType.text }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(bell, i) in bells" :key="i">
        <td class="text-center">
          {{ `${bell.start}-${bell.finish}` }}
        </td>

        <td v-for="(dayType, i) in dayOptions" :key="i" 
            class="border border-gray-600">
          <lesson-field
            :lesson="getLesson(bell.ordinal, dayType.text)?.lesson"
            :groups="getLesson(bell.ordinal, dayType.text)?.groups"/>
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
</template>

<script setup lang="ts">
import { ref, computed, watch } from '#imports'

import { useFaculties } from '~/composables/faculties'
import { useTeachers } from '~/composables/teachers'
import { usePlans } from '~/composables/plans'
import { DayType } from '~/models/DayType'

const selectedTime = ref()
const selectedEntity = ref()

const times = ['день', 'неделя']
const entities = ['преподаватель', 'группа']

const dayOptions = Object.entries(DayType).map(([key, value]) => ({ value: key, text: value }))
const isTeacher = computed(() => selectedEntity.value === 'преподаватель')
const faculty = ref(1)
const teacherId = ref(1)
const groupId = ref(1)
const plan = ref()
const day = ref(DayType.FRIDAY)

const { getList: getTeachers } = useTeachers()
const { getList: getFaculties, getGroups } = useFaculties()
const { findByTeacherWeek, findByTeacherDay, getBells } = usePlans()

const { data: bells } = getBells()
const { data: teachers } = getTeachers()
const { data: faculties } = getFaculties()
const { data: groups } = getGroups(faculty)

const teacherDayPlanRequest = ref()

const { data: teacherWeekPlan, refetch: fetchTeacherWeekPlan } = findByTeacherWeek(teacherId)
const { data: teacherDayPlan, refetch: fetchTeacherDayPlan } = findByTeacherDay(teacherDayPlanRequest)

watch(day, (newValue, oldValue) => {
  teacherDayPlanRequest.value = {
    teacherId: teacherId.value,
    day: newValue
  }
})

watch(teacherId, (newValue, oldValue) => {
  teacherDayPlanRequest.value = {
    teacherId: newValue,
    day: day.value
  }
})


function search(): void {
  if (isTeacher.value) {
    if (selectedTime.value === 'день') {
      fetchTeacherDayPlan()
      
      plan.value = teacherDayPlan.value
      return
    }

    if (selectedTime.value === 'неделя') {
      fetchTeacherWeekPlan()

      plan.value = teacherWeekPlan.value
      return
    }
  } 
}

// норм навернул, да?)00
function getLesson(bellOrdinal: number, dayType: DayType): any {
  if (plan.value?.day) {
    return plan.value?.lessons.find((lesson: any) => {
      const key = Object.keys(DayType)[Object.values(DayType).indexOf(dayType)]

      return lesson.lesson.day === key && lesson.lesson.bell.ordinal === bellOrdinal
    })
  }

  return plan.value?.dayPlans.find((dayPlan: any) => {
    return dayPlan.lessons.find((lesson: any) => {
      const key = Object.keys(DayType)[Object.values(DayType).indexOf(dayType)]

      return lesson.lesson.day === key && lesson.lesson.bell.ordinal === bellOrdinal
    })
  })?.lessons.find((lesson: any) => {
    const key = Object.keys(DayType)[Object.values(DayType).indexOf(dayType)]
    
    return lesson.lesson.day === key && 
           lesson.lesson.bell.ordinal === bellOrdinal
  })
}
</script>