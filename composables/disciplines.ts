import { 
  UseMutationReturnType, 
  UseQueryReturnType, 
  useMutation, 
  useQuery, 
  useQueryClient
} from '@tanstack/vue-query'

import { useApi } from './api'
import { KEYS } from '~/constants/queries'
import { Discipline } from '~/models/Discipline'
import { DisciplineUpdateRequest } from '~/models/requests/discipline/DisciplineUpdateRequest'

const BASE_URL = 'discipline'

export function useDisciplines() {
  const queryClient = useQueryClient()

  const { request, post } = useApi()

  function getList(pattern?: string): UseQueryReturnType<Discipline[], unknown> {
    return useQuery([KEYS.DISCIPLINES_LIST, pattern], async () =>
      await request<Discipline[]>(`${BASE_URL}${pattern ? `?pattern=${pattern}` : ''}`))
  }

  function create(): UseMutationReturnType<void, unknown, DisciplineUpdateRequest, unknown> {
    return useMutation(async (payload: DisciplineUpdateRequest) => {
      return post<Discipline>(BASE_URL, payload)
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries([KEYS.DISCIPLINES_LIST])
      }
    })
  }

  function findById(id: number): UseQueryReturnType<Discipline, unknown> {
    return useQuery([KEYS.DISCIPLINE, id], async () => 
      request<Discipline>(`${BASE_URL}?id=${id}`))
  }

  return {
    getList, create, findById
  }
}