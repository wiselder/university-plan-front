import { 
  UseQueryReturnType,
  useQuery
} from '@tanstack/vue-query'

import { useApi } from './api'
import { Plan } from '~/models/Plan'
import { DayPlan } from '~/models/DayPlan'
import { GroupWeekPlanRequest } from '~/models/payloads/group/GroupWeekPlanRequest'
import { TeacherDayPlanRequest } from '~/models/payloads/teacher/TeacherDayPlanRequest'
import { KEYS } from '~/constants/queries'
import { GroupDayPlanRequest } from '~/models/payloads/group/GroupDayPlanRequest'

const BASE_URL = 'plan'

export default function usePlans() {
  const { request } = useApi()

  function findByTeacherWeek(id: Ref<number>): UseQueryReturnType<Plan, unknown> {
    return useQuery([KEYS.TEACHER_WEEK_PLAN, id], async () => 
      await request<Plan>(`${BASE_URL}/teacher/week`))
  }

  function findByTeacherDay(teacherRequest: TeacherDayPlanRequest): UseQueryReturnType<DayPlan, unknown> {
    return useQuery([KEYS.TEACHER_DAY_PLAN, teacherRequest], async () => 
      await request<DayPlan>(`${BASE_URL}/teacher/day`))
  }

  function findByGroupWeek(groupRequest: GroupWeekPlanRequest): UseQueryReturnType<Plan, unknown> {
    return useQuery([KEYS.GROUP_WEEK_PLAN, groupRequest], async () => 
      await request<Plan>(`${BASE_URL}/group/week`))
  }

  function findByGroupDay(groupRequest: GroupDayPlanRequest): UseQueryReturnType<DayPlan, unknown> {
    return useQuery([KEYS.GROUP_DAY_PLAN, groupRequest], async () => 
      await request<DayPlan>(`${BASE_URL}/group/day`))
  }

  return {
    findByTeacherWeek, findByTeacherDay,
    findByGroupWeek, findByGroupDay
  }
}