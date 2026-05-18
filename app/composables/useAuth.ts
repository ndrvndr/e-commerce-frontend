import type { User } from "~/types/me";

export const useAuth = () => {
  const user = useState<User | null | undefined>("user", () => undefined);
  const config = useRuntimeConfig();

  const fetchUser = async (cookieHeader?: string) => {
    console.log("[fetchUser] meta.server:", import.meta.server);
    console.log("[fetchUser] user.value:", user.value);
    console.log("[fetchUser] cookieHeader:", cookieHeader);

    if (import.meta.client && user.value !== undefined) return;

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (cookieHeader) {
      headers.cookie = cookieHeader;
    }

    console.log(
      "[fetchUser] final headers being sent:",
      JSON.stringify(headers),
    );

    try {
      const response = await $fetch<{ data: User }>(
        `${config.public.apiBase}/api/me`,
        {
          credentials: "include",
          headers,
        },
      );
      console.log("[fetchUser] success, user:", response.data);
      user.value = response.data;
    } catch (e: any) {
      console.log("[fetchUser] error status:", e?.response?.status);
      console.log("[fetchUser] error message:", e?.message);
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
