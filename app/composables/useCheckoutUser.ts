import type { AddressWithId } from '~/types/address';
import type { User } from '~/types/me';

export function useCheckoutUser() {
  const toast = useToast();
  const router = useRouter();
  const authToken = useCookie('auth_token');
  const isLoggingOut = ref(false);

  const { data: meResponse, execute: fetchCurrentUser } = useApi<User>(
    '/api/me',
    {
      immediate: !!authToken.value,
    },
  );

  const currentUser = computed(() => meResponse.value?.data ?? null);

  const {
    data: addressesResponse,
    refresh: refreshAddresses,
    execute: fetchAddresses,
  } = useApi<AddressWithId[]>('/api/addresses', {
    key: 'user-addresses',
    immediate: !!authToken.value,
  });

  const savedAddresses = computed(() => addressesResponse.value?.data ?? []);
  const defaultAddress = computed(
    () => savedAddresses.value.find((a) => a.is_default) ?? null,
  );
  const hasReachedAddressLimit = computed(
    () => savedAddresses.value.length >= 4,
  );

  watch(
    () => authToken.value,
    (newToken) => {
      if (newToken) {
        fetchCurrentUser();
        fetchAddresses();
      }
    },
    { immediate: true },
  );

  async function handleLogout() {
    isLoggingOut.value = true;
    try {
      await useApi('/api/logout', { method: 'POST' });
    } catch (error) {
      console.error('[useCheckoutUser] Logout failed:', error);
    } finally {
      isLoggingOut.value = false;
      authToken.value = null;
      toast.add({
        title: 'Signed out',
        description: 'You have been logged out successfully.',
        color: 'success',
      });
      router.push('/authentication/login');
    }
  }

  return {
    currentUser,
    savedAddresses,
    defaultAddress,
    hasReachedAddressLimit,
    refreshAddresses,
    isLoggingOut,
    handleLogout,
  };
}
