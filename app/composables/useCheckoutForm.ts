import type { MaybeRefOrGetter } from 'vue';
import type { AddressWithId } from '~/types/address';
import type { CheckoutFormSchema } from '~/types/checkout';
import { SHIPPINGS } from '~/constant';

const DEFAULT_COUNTRY = 'Indonesia' as const;
const DEFAULT_PROVINCE = 'West Java' as const;

export function useCheckoutForm(
  defaultAddress: MaybeRefOrGetter<AddressWithId | null>,
  savedAddresses: MaybeRefOrGetter<AddressWithId[]>,
  currentUserEmail: MaybeRefOrGetter<string | undefined>,
) {
  function buildInitialFormState(): Partial<CheckoutFormSchema> {
    const defaultCourierCode = toValue(defaultAddress)
      ? SHIPPINGS[0]?.courier_code
      : undefined;

    return {
      email: toValue(currentUserEmail) ?? '',
      country: DEFAULT_COUNTRY,
      province: DEFAULT_PROVINCE,
      courierCode: defaultCourierCode,
      isSameAsShipping: true,
      billingAddress: {
        country: DEFAULT_COUNTRY,
        province: DEFAULT_PROVINCE,
      },
    };
  }

  const formState = reactive<Partial<CheckoutFormSchema>>(
    buildInitialFormState(),
  );
  const selectedAddressId = ref<number | null>(null);

  function applyAddressToForm(address: AddressWithId): void {
    selectedAddressId.value = address.id;
    formState.first_name = address.first_name;
    formState.last_name = address.last_name;
    formState.address = address.address;
    formState.country = address.country;
    formState.province = address.province;
    formState.city = address.city;
    formState.postal_code = address.postal_code;
    formState.phone_number = address.phone_number;
    formState.note = address.note ?? undefined;
  }

  onMounted(() => {
    const currentDefault = toValue(defaultAddress);
    if (currentDefault && !formState.address) {
      applyAddressToForm(currentDefault);
    }
  });

  watch(
    () => toValue(defaultAddress),
    (newDefaultAddress) => {
      if (newDefaultAddress && !formState.address) {
        applyAddressToForm(newDefaultAddress);
      }
    },
  );

  function isAddressChanged(a: AddressWithId, b: AddressWithId): boolean {
    const fields = [
      'first_name',
      'last_name',
      'address',
      'note',
      'city',
      'province',
      'postal_code',
      'phone_number',
      'country',
      'is_default',
    ] as const;
    return fields.some((f) => a[f] !== b[f]);
  }

  watch(
    () => toValue(savedAddresses),
    (updatedAddresses, previousAddresses) => {
      if (!previousAddresses?.length && !updatedAddresses.length) return;

      const wasAddressAdded =
        updatedAddresses.length > (previousAddresses?.length ?? 0);
      const wasAddressDeleted =
        updatedAddresses.length < (previousAddresses?.length ?? 0);

      if (wasAddressAdded) {
        const newlyAddedAddress = updatedAddresses.find(
          (addr) => !previousAddresses?.some((prev) => prev.id === addr.id),
        );
        if (newlyAddedAddress) {
          applyAddressToForm(newlyAddedAddress);
          return;
        }
      }

      if (wasAddressDeleted) {
        const deletedAddressId = previousAddresses?.find(
          (prev) => !updatedAddresses.some((addr) => addr.id === prev.id),
        )?.id;

        if (deletedAddressId === selectedAddressId.value) {
          const fallbackAddress =
            updatedAddresses.find((a) => a.is_default) ??
            updatedAddresses[0] ??
            null;

          if (fallbackAddress) {
            applyAddressToForm(fallbackAddress);
          } else {
            selectedAddressId.value = null;
            formState.address = undefined;
          }
        }
        return;
      }

      const changedAddresses = updatedAddresses.filter((updated) => {
        const original = previousAddresses?.find(
          (prev) => prev.id === updated.id,
        );
        return original !== undefined && isAddressChanged(updated, original);
      });

      if (changedAddresses.length > 0) {
        const editedAddress =
          changedAddresses.find((a) => a.is_default) ?? changedAddresses[0]!;
        applyAddressToForm(editedAddress);
        return;
      }

      if (selectedAddressId.value !== null) {
        const currentlySelectedAddress = updatedAddresses.find(
          (a) => a.id === selectedAddressId.value,
        );
        if (currentlySelectedAddress) {
          applyAddressToForm(currentlySelectedAddress);
        }
      }
    },
    { deep: true },
  );

  const selectedShipping = computed(() =>
    SHIPPINGS.find((s) => s.courier_code === formState.courierCode),
  );

  const shippingCost = computed(() => selectedShipping.value?.price ?? 0);

  function resetForm(): void {
    Object.assign(formState, buildInitialFormState());
    selectedAddressId.value = null;
  }

  return {
    formState,
    selectedAddressId,
    selectedShipping,
    shippingCost,
    applyAddressToForm,
    resetForm,
    DEFAULT_COUNTRY,
    DEFAULT_PROVINCE,
  };
}
