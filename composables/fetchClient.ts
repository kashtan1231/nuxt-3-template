import type { API } from '~/types/api'
import type { UseFetchOptions } from '#app'

export const useAPI = async <T>(
  request: RequestInfo,
  opts?: UseFetchOptions<T>,
  executingOptions?: API.RequestOptions
) => {
  if (executingOptions?.loading) executingOptions.loading.value = true
  if (executingOptions?.errorMessage) executingOptions.errorMessage.value = ''

  return useFetch(request, {
    baseURL: useRuntimeConfig().public.BASE_API_URL,
    ...opts,
    server: executingOptions?.server || false,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },

    async onResponse() {
      if (executingOptions?.loading) executingOptions.loading.value = false
    },
  })
}
