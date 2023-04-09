import { DayType } from '../../DayType'
import { WeekType } from '../../WeekType'

export interface TeacherDayPlanRequest {
  week: WeekType
  day: DayType
  teacherId: number
}