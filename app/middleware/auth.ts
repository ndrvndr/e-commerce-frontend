export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return;

  const { fetchUser, isLoggedIn } = useAuth();

  await fetchUser();

  if (!isLoggedIn.value) {
    return navigateTo("/authentication/login");
  }
});
