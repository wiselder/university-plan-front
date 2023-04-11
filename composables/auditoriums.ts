import { 
  UseMutationReturnType, 
  UseQueryReturnType, 
  useMutation, 
  useQuery, 
  useQueryClient
} from '@tanstack/vue-query'

import { useApi } from './api'
import { KEYS } from '~/constants/queries'
import { Auditorium } from '~/models/Auditorium'
import { AuditoriumUpdateRequest } from '~/models/requests/auditorium/AuditoriumUpdateRequest'

const BASE_URL = 'auditorium'

export function useAuditoriums() {
  const queryClient = useQueryClient()

  const { request, post } = useApi()

  function getList(pattern?: string): UseQueryReturnType<Auditorium[], unknown> {
    return useQuery([KEYS.AUDITORIUMS_LIST, pattern], async () =>
      await request<Auditorium[]>(`${BASE_URL}${pattern ? `?pattern=${pattern}` : ''}`))
  }

  function create(): UseMutationReturnType<void, unknown, AuditoriumUpdateRequest, unknown> {
    return useMutation(async (payload: AuditoriumUpdateRequest) => {
      return post<Auditorium>(BASE_URL, payload)
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries([KEYS.AUDITORIUMS_LIST])
      }
    })
  }

  function findById(id: number): UseQueryReturnType<Auditorium, unknown> {
    return useQuery([KEYS.AUDITORIUM, id], async () => 
      request<Auditorium>(`${BASE_URL}?id=${id}`))
  }

  return {
    getList, create, findById
  }
}