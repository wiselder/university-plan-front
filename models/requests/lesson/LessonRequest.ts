import { DayType } from '~/models/DayType'

export interface LessonsRequest {
  groupIds: number[]
  disciplineId: number
  auditoriumId: number
  teacherId: number
  day: DayType
  bellOrdinal: number
}