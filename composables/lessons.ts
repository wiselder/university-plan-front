import { 
  UseMutationReturnType, 
  UseQueryReturnType, 
  useMutation, 
  useQuery, 
  useQueryClient
} from '@tanstack/vue-query'

import { useApi } from './api'
import { KEYS } from '~/constants/queries'
import { LessonRequest } from '~/models/payloads/lesson/LessonRequest'
import { LessonResponse } from '~/models/responses/LessonResponse'
import { LessonUpdateRequest } from '~/models/requests/lesson/LessonUpdateRequest'

const BASE_URL = 'lesson'

export function useLessons() {
  const queryClient = useQueryClient()

  const { request, post, remove } = useApi()

  function create(): UseMutationReturnType<void, unknown, LessonRequest, unknown> {
    return useMutation(async (payload: LessonRequest) => {
      return post<LessonResponse>(BASE_URL, payload)
    })
  }

  function find(id: string): UseQueryReturnType<LessonResponse, unknown> {
    return useQuery([KEYS.LESSON, id], async () => 
      await request<LessonResponse>(`${BASE_URL}?id=${id}`))
  }

  function update(): UseMutationReturnType<void, unknown, LessonUpdateRequest, unknown> {
    return useMutation(async (payload: LessonUpdateRequest) => {
      return post<LessonResponse>(`${BASE_URL}?id=${payload.id}`, payload.request)
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries([KEYS.LESSON])
      }
    })
  }

  function deleteLesson(): UseMutationReturnType<void, unknown, number, unknown> {
    return useMutation(async (id: number) => await remove(`${BASE_URL}/${id}`), {
      onSuccess: async () => {
        await queryClient.invalidateQueries([KEYS.LESSON])
      }
    })
  }

  return {
    create, find, update, deleteLesson
  }
}