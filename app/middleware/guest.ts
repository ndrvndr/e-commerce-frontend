export default defineNuxtRouteMiddleware(async () => {
  const allHeaders = useRequestHeaders();
  const cookieHeader = useRequestHeaders(["cookie"]).cookie;

  console.log("[guest middleware] all headers:", JSON.stringify(allHeaders));
  console.log("[guest middleware] cookie header:", cookieHeader);
  console.log("[guest middleware] import.meta.server:", import.meta.server);

  const { fetchUser, isLoggedIn } = useAuth();
  await fetchUser(cookieHeader);

  console.log("[guest middleware] isLoggedIn after fetch:", isLoggedIn.value);

  if (isLoggedIn.value) {
    return navigateTo("/profile");
  }
});
