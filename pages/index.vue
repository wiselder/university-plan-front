<template>
  Test

  {{ teachers }}
</template>

<script setup lang="ts">
import { ref } from '#imports'

import { useTeachers } from '~/composables/teachers'

const teachersPattern = ref('test')

const { getList: getTeachers } = useTeachers()

const { isLoading: isResourcesLoading, data: teachers } = getTeachers(teachersPattern.value)
</script>