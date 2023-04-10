import { 
  UseMutationReturnType, 
  UseQueryReturnType, 
  useMutation, 
  useQuery, 
  useQueryClient
} from '@tanstack/vue-query'

import { useApi } from './api'
import { KEYS } from '~/constants/queries'
import { Faculty } from '~/models/Faculty'
import { FacultyRequest } from '~/models/requests/faculty/FacultyRequest'
import { Group } from '~/models/Group'
import { FacultyCreateGroupRequest } from '~/models/requests/faculty/FacultyCreateGroupRequest'

import pick from 'lodash/pick'

const BASE_URL = 'faculty'

export function useFaculties() {
  const queryClient = useQueryClient()

  const { request, post } = useApi()

  function getList(): UseQueryReturnType<Faculty[], unknown> {
    return useQuery([KEYS.FACULTY_LIST], async () => 
      await request<Faculty[]>(BASE_URL))
  }

  function create(): UseMutationReturnType<void, unknown, FacultyRequest, unknown> {
    return useMutation(async (payload: FacultyRequest) => {
      return post<Faculty>(BASE_URL, payload)
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries([KEYS.FACULTY_LIST])
      }
    })
  }

  function getGroups(id: number): UseQueryReturnType<Group[], unknown> {
    return useQuery([KEYS.FACULTY_GROUP_LIST, id], async () => 
      await request<Group[]>(`${BASE_URL}/${id}/groups`))
  }

  function addGroup(): UseMutationReturnType<void, unknown, FacultyCreateGroupRequest, unknown> {
    return useMutation(async (payload: FacultyCreateGroupRequest) => {
      return post<Group>(`${BASE_URL}/${payload.id}/groups`, pick(payload, [
        'subNumber',
        'number',
        'course'
      ]))
    }, {
      onSuccess: () => Promise.all([    
        queryClient.invalidateQueries([KEYS.FACULTY_LIST]),
        queryClient.invalidateQueries([KEYS.FACULTY_GROUP_LIST])
      ])
    })
  }

  return {
    getList, create, getGroups, addGroup
  }
}