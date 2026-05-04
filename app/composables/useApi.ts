import type { UseFetchOptions } from '#app';
import type { ApiResponse } from '~/types/api';

export function useApi<T>(
  url: string | (() => string),
  options?: UseFetchOptions<ApiResponse<T>>,
) {
  const config = useRuntimeConfig();

  return useFetch<ApiResponse<T>>(url, {
    baseURL: config.public.apiBase,
    ...options,
  });
}
