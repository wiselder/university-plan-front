import { LessonRequest } from '~/models/payloads/lesson/LessonRequest'

export interface LessonUpdateRequest {
  request: LessonRequest
  id: number
}