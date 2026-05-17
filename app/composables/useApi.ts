import type { UseFetchOptions } from '#app';
import type { ApiResponse } from '~/types/api';

export function useApi<T>(
  url: string | (() => string),
  options?: UseFetchOptions<ApiResponse<T>>,
) {
  const config = useRuntimeConfig();

  const serverHeaders: Record<string, string> = {};
  if (import.meta.server) {
    const requestHeaders = useRequestHeaders(['cookie']);
    if (requestHeaders.cookie) {
      serverHeaders.cookie = requestHeaders.cookie;
    }
  }

  return useFetch<ApiResponse<T>>(url, {
    baseURL: config.public.apiBase,
    credentials: 'include',
    ...options,
    headers: {
      Accept: 'application/json',
      ...serverHeaders,
      ...options?.headers,
    },
  });
}
