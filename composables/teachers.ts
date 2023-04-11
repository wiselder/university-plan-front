import { 
  UseMutationReturnType, 
  UseQueryReturnType, 
  useMutation, 
  useQuery, 
  useQueryClient
} from '@tanstack/vue-query'

import { useApi } from './api'
import { Teacher } from '~/models/Teacher'
import { KEYS } from '~/constants/queries'
import { TeacherRequest } from '~/models/requests/teacher/TeacherRequest'

const BASE_URL = 'teacher'

export function useTeachers() {
  const queryClient = useQueryClient()

  const { request, post } = useApi()

  function getList(pattern?: string): UseQueryReturnType<Teacher[], unknown> {
    return useQuery([KEYS.TEACHERS_LIST, pattern], async () => 
      await request<Teacher[]>(`${BASE_URL}${pattern ? `?pattern=${pattern}` : ''}`))
  }

  function create(): UseMutationReturnType<void, unknown, TeacherRequest, unknown> {
    return useMutation(async (payload: TeacherRequest) => {
      return post<Teacher>(BASE_URL, payload)
    }, {
      onSuccess: async () => { 
        await queryClient.invalidateQueries([KEYS.TEACHERS_LIST])
      }
    })
  }

  function findById(id: number): UseQueryReturnType<Teacher, unknown> {
    return useQuery([KEYS.TEACHER, id], async () => 
      request<Teacher>(`${BASE_URL}?id=${id}`))
  }

  return {
    getList, create, findById
  }
}