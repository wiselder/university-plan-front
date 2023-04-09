import { Auditorium } from './Auditorium'
import { Bell } from './Bell'
import { DayType } from './DayType'
import { Discipline } from './Discipline'
import { Teacher } from './Teacher'
import { WeekType } from './WeekType'

export interface Lesson {
  discipline: Discipline
  auditorium: Auditorium
  teacher: Teacher
  week: WeekType
  day: DayType
  bell: Bell
  id: number
}