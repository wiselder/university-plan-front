import { 
  UseMutationReturnType, 
  UseQueryReturnType, 
  useMutation, 
  useQuery, 
  useQueryClient
} from '@tanstack/vue-query'

import { useApi } from './api'
import { Teacher } from '~/models/Teacher'
import { TeacherRequest } from '~/models/payloads/teacher/TeacherRequest'
import { KEYS } from '~/constants/queries'

const BASE_URL = 'teacher'

export function useTeachers() {
  const queryClient = useQueryClient()

  const { request, post } = useApi()

  function getList(pattern: Ref<string>): UseQueryReturnType<Teacher[], unknown> {
    return useQuery([KEYS.TEACHERS_LIST, pattern], async () => 
      await request<Teacher[]>(`${BASE_URL}?pattern=${pattern}`))
  }

  function create(): UseMutationReturnType<void, unknown, TeacherRequest, unknown> {
    return useMutation(async (payload: TeacherRequest) => {
      return post<void>(BASE_URL, payload)
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries([KEYS.TEACHERS_LIST])
      }
    })
  }

  function findById(teacherId: Ref<number>): UseQueryReturnType<Teacher, unknown> {
    return useQuery([KEYS.TEACHER, teacherId], async () => 
      request<Teacher>(`${BASE_URL}?id=${teacherId}`))
  }

  return {
    getList, create, findById
  }
}