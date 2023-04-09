import { DayType } from '~/models/DayType'

export interface LessonRequest {
  groupIds: number[]
  disciplineId: number
  auditoriumId: number
  teacherId: number
  day: DayType
  bellOrdinal: number
}