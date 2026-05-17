import type { User } from "~/types/me";

export const useAuth = () => {
  const user = useState<User | null | undefined>("user", () => undefined);
  const config = useRuntimeConfig();

  // Capture request headers synchronously in setup body (same pattern as useApi.ts).
  // useRequestHeaders uses useNuxtApp() internally and must be called
  // in a synchronous Nuxt context, not inside an async function.
  const serverCookieHeader = import.meta.server
    ? (useRequestHeaders(["cookie"]).cookie ?? null)
    : null;

  const fetchUser = async () => {
    if (user.value !== undefined) return;

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (serverCookieHeader) {
      headers.cookie = serverCookieHeader;
    }

    try {
      const response = await $fetch<{ data: User }>(
        `${config.public.apiBase}/api/me`,
        {
          credentials: "include",
          headers,
        },
      );
      user.value = response.data;
    } catch (e) {
      user.value = null;
    }
  };

  const logout = async () => {
    try {
      await $fetch(`${config.public.apiBase}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      user.value = undefined;
      navigateTo("/authentication/login");
    }
  };

  const isLoggedIn = computed(() => !!user.value);

  const clearUser = () => {
    user.value = undefined;
  };

  return { user, fetchUser, clearUser, logout, isLoggedIn };
};
