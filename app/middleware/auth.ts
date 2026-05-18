export default defineNuxtRouteMiddleware(async () => {
  const { fetchUser, isLoggedIn } = useAuth();

  const headers = useRequestHeaders(["cookie"]);
  await fetchUser(headers.cookie);

  if (!isLoggedIn.value) {
    return navigateTo("/authentication/login");
  }
});
