export default defineNuxtRouteMiddleware(async () => {
  const { fetchUser, isLoggedIn } = useAuth();

  if (import.meta.server) {
    const event = useRequestEvent();
    const cookie = event?.node.req.headers.cookie ?? null;

    if (cookie) {
      const config = useRuntimeConfig();
      const { user } = useAuth();

      try {
        const response = await $fetch<{ data: any }>(
          `${config.public.apiBase}/api/me`,
          {
            headers: {
              Accept: "application/json",
              cookie,
            },
          },
        );
        user.value = response.data;
      } catch (e) {
        user.value = null;
      }
    }
  } else {
    await fetchUser();
  }

  if (isLoggedIn.value) {
    return navigateTo("/profile");
  }
});
