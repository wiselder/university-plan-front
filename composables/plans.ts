import { 
  UseQueryReturnType,
  useQuery
} from '@tanstack/vue-query'

import { useApi } from './api'
import { Plan } from '~/models/Plan'
import { DayPlan } from '~/models/DayPlan'
import { KEYS } from '~/constants/queries'
import { Bell } from '~/models/Bell'
import { TeacherDayPlanRequest } from '~/models/requests/teacher/TeacherDayPlanRequest'
import { GroupWeekPlanRequest } from '~/models/requests/group/GroupWeekPlanRequest'
import { GroupDayPlanRequest } from '~/models/requests/group/GroupDayPlanRequest'
import { Ref } from 'nuxt/dist/app/compat/capi'

const BASE_URL = 'plan'

export function usePlans() {
  const { request, post } = useApi()

  function findByTeacherWeek(id: Ref<number>): UseQueryReturnType<Plan, unknown> {
    return useQuery([KEYS.TEACHER_WEEK_PLAN, id], async () => 
      await post<Plan>(`${BASE_URL}/teacher/week`, { 
        'teacherId': id.value 
      }))
  }

  function findByTeacherDay(teacherRequest: TeacherDayPlanRequest): UseQueryReturnType<DayPlan, unknown> {
    return useQuery([KEYS.TEACHER_DAY_PLAN, teacherRequest], async () => 
      await post<DayPlan>(`${BASE_URL}/teacher/day`))
  }

  function findByGroupWeek(groupRequest: GroupWeekPlanRequest): UseQueryReturnType<Plan, unknown> {
    return useQuery([KEYS.GROUP_WEEK_PLAN, groupRequest], async () => 
      await post<Plan>(`${BASE_URL}/group/week`))
  }

  function findByGroupDay(groupRequest: GroupDayPlanRequest): UseQueryReturnType<DayPlan, unknown> {
    return useQuery([KEYS.GROUP_DAY_PLAN, groupRequest], async () => 
      await post<DayPlan>(`${BASE_URL}/group/day`))
  }

  function getBells(): UseQueryReturnType<Bell[], unknown> {
    return useQuery([KEYS.BELLS_LIST], async () => 
      await request<Bell[]>(`${BASE_URL}/bells`))
  }

  return {
    findByTeacherWeek, findByTeacherDay,
    findByGroupWeek, findByGroupDay,
    getBells
  }
}