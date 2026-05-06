import type { UseFetchOptions } from '#app';
import type { ApiResponse } from '~/types/api';

export function useApi<T>(
  url: string | (() => string),
  options?: UseFetchOptions<ApiResponse<T>>,
) {
  const config = useRuntimeConfig();

  const token = useCookie('auth_token').value;

  return useFetch<ApiResponse<T>>(url, {
    baseURL: config.public.apiBase,
    ...options,
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
}
