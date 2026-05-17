import type { AddressWithId } from "~/types/address";

export function useCheckoutUser() {
  const toast = useToast();
  const { user, logout, isLoggedIn, fetchUser } = useAuth();
  const isLoggingOut = ref(false);

  const { data: addressesResponse, refresh: refreshAddresses } = useApi<
    AddressWithId[]
  >("/api/addresses", {
    key: "user-addresses",
    server: false,
    immediate: false,
  });

  const isLoadingUser = ref(true);
  const isLoadingAddresses = ref(false);

  const currentUser = computed(() => user.value ?? null);
  const savedAddresses = computed(() => addressesResponse.value?.data ?? []);
  const defaultAddress = computed(
    () => savedAddresses.value.find((a) => a.is_default) ?? null,
  );
  const hasReachedAddressLimit = computed(
    () => savedAddresses.value.length >= 4,
  );

  onMounted(async () => {
    isLoadingUser.value = true;
    await fetchUser();
    isLoadingUser.value = false;

    if (isLoggedIn.value) {
      isLoadingAddresses.value = true;
      await refreshAddresses();
      isLoadingAddresses.value = false;
    }
  });

  async function handleLogout() {
    isLoggingOut.value = true;
    try {
      await logout();
      toast.add({
        title: "Signed out",
        description: "You have been logged out successfully.",
        color: "success",
      });
    } catch (error) {
      console.error("[useCheckoutUser] Logout failed:", error);
    } finally {
      isLoggingOut.value = false;
    }
  }

  return {
    currentUser,
    savedAddresses,
    defaultAddress,
    hasReachedAddressLimit,
    refreshAddresses,
    isLoadingUser,
    isLoadingAddresses,
    isLoggingOut,
    handleLogout,
  };
}
