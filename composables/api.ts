import isEmpty from 'lodash/isEmpty'

const API_URL = ''

export function useApi() {
  function request<T>(
    url: string, 
    method: string = 'GET', 
    data: object = {},
    params: Record<string, string | number | undefined> = {}): Promise<T | { error: unknown }> {
    return fetch(`${API_URL}/${url}`, getOptions(method, data)).then((response) => {
      if (!response.ok) {
        return Promise.reject(response)
      }

      return response.json()
    }).catch((error) => {
      console.log(`Some error happens: ${error}`)
      
      return { 
        error: error.message 
      }
    })
  }

  async function post<T>(
    url: string,
    data: object = {},
    params: Record<string, string | number | undefined> = {}): Promise<void> {
    await request<T>(url, 'POST', data, params)
  }

  async function put<T>(
    url: string,
    data: object = {},
    params: Record<string, string | number | undefined> = {}): Promise<void> {
    await request<T>(url, 'PUT', data, params)    
  }
  
  async function remove<T>(
    url: string,
    params: Record<string, string | number | undefined> = {}): Promise<void> {
    await request(url, 'DELETE', {}, params)
  }

  function getOptions(method: string, data: object = {}): RequestInit {
    let options = {
      method: method.toUpperCase()
    } as RequestInit

    let headers: HeadersInit = []

    if (!isEmpty(data)) {
      options.body = JSON.stringify(data)

      headers.push(['Content-Type', 'application/json'])
    }

    options.headers = headers
    
    return options
  }

  return {
    request, post, put, remove
  }
}