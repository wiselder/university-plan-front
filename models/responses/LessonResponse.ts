import { Group } from '../Group'
import { Lesson } from '../Lesson'

export interface LessonResponse {
  groups: Group[]
  lesson: Lesson
}