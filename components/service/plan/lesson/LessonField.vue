<template>
  <span 
    v-if="lesson?.discipline"
    class="flex flex-col">
    <span>
      {{ lesson?.discipline?.name }}
    </span>

    <span>
      Преподаватель: {{ lesson?.teacher?.name }}
    </span>

    <span>
      Аудитория: {{ lesson?.auditorium?.name }} | {{ lesson?.auditorium.address }}
    </span>

    <span class="flex flex-col">
      Группы: 

      <span v-for="(group, i) in groups" :key="i">
        {{ `${group.number}-${group.subNumber}` }}
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { Group } from '~/models/Group'
import { Lesson } from '~/models/Lesson'

defineProps<{
  lesson: Lesson | undefined
  groups: Group[] | undefined
}>()
</script>