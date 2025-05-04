import type { API } from '~/types/api'
import type { UseFetchOptions } from '#app'

export const useAPI = async <T>(
  request: RequestInfo,
  opts?: Parameters<typeof $fetch<T>>[1],
  executingOptions?: API.RequestOptions
) => {
  const res: API.NetworkResponse<T> = {
    status: ref(0),
    data: ref(null),
    error: ref(null),
  }

  try {
    if (executingOptions?.loading) executingOptions.loading.value = true
    await $fetch<T>(request, {
      baseURL: useRuntimeConfig().public.BASE_API_URL,
      ...opts,
      onResponse({ response }) {
        res.status.value = response.status
        res.data.value = response._data
        res.error.value = null
      },
      onResponseError({ response }) {
        const firstKey = Object.keys(response._data)[0]
        const firstValue = response._data[firstKey]

        res.data.value = null
        res.error.value = Array.isArray(firstValue)
          ? firstValue[0]
          : firstValue || 'Something went wrong, please try again.'
      },
    })
  } catch (error) {
    console.error(error)
  } finally {
    if (executingOptions?.loading) executingOptions.loading.value = false
  }

  return res
}

export const useServerAPI = async <T>(request: RequestInfo, opts?: UseFetchOptions<T>) => {
  return useFetch(request, {
    baseURL: useRuntimeConfig().public.BASE_API_URL,
    ...opts,
  })
}
