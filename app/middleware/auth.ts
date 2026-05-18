export default defineNuxtRouteMiddleware(async () => {
  const allHeaders = useRequestHeaders();
  const cookieHeader = useRequestHeaders(["cookie"]).cookie;

  console.log("[auth middleware] all headers:", JSON.stringify(allHeaders));
  console.log("[auth middleware] cookie header:", cookieHeader);
  console.log("[auth middleware] import.meta.server:", import.meta.server);

  const { fetchUser, isLoggedIn } = useAuth();
  await fetchUser(cookieHeader);

  console.log("[auth middleware] isLoggedIn after fetch:", isLoggedIn.value);

  if (!isLoggedIn.value) {
    return navigateTo("/authentication/login");
  }
});
