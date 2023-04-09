import { DayType } from '~/models/DayType'
import { GroupWeekPlanRequest } from './GroupWeekPlanRequest'
import { WeekType } from '~/models/WeekType'

export interface GroupDayPlanRequest {
  group: GroupWeekPlanRequest
  week: WeekType
  day: DayType
}