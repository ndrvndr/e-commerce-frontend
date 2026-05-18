import type { User } from "~/types/me";

export const useAuth = () => {
  const user = useState<User | null | undefined>("user", () => undefined);
  const config = useRuntimeConfig();

  const fetchUser = async () => {
    if (user.value !== undefined) return;

    try {
      const response = await $fetch<{ data: User }>(
        `${config.public.apiBase}/api/me`,
        {
          credentials: "include",
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
