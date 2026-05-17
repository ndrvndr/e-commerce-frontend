<template>
  <UMain>
    <UContainer
      class="max-w-lg mx-auto py-4 flex flex-col md:py-6 lg:gap-10 lg:max-w-7xl lg:py-8 lg:flex-row"
    >
      <UForm
        :schema="CheckoutFormSchema"
        :state="formState"
        class="flex-1 space-y-4"
        @submit="handleFormSubmit"
      >
        <CheckoutContactSection
          :current-user="currentUser"
          :email="formState.email ?? ''"
          :is-logging-out="isLoggingOut"
          :is-loading="isLoadingUser"
          @logout="handleLogout"
          @update:email="formState.email = $event"
        />

        <CheckoutDeliverySection
          :saved-addresses="savedAddresses"
          :has-default-address="!!defaultAddress"
          :has-reached-address-limit="hasReachedAddressLimit"
          :selected-address="formState.address"
          :form-state="formState"
          :refresh-addresses="refreshAddresses"
          :is-loading="isLoadingUser || isLoadingAddresses"
          @select-address="applyAddressToForm"
          @update:field="(field, value) => ((formState as any)[field] = value)"
        />

        <CheckoutShippingSection
          :shipping-options="SHIPPINGS"
          :selected-courier-code="formState.courierCode"
          :selected-shipping="selectedShipping"
          :is-address-complete="isShippingAddressComplete"
          @update:courier-code="formState.courierCode = $event"
        />

        <CheckoutPaymentSection
          :is-same-as-shipping="formState.isSameAsShipping ?? true"
          :billing-address="formState.billingAddress"
          @update:is-same-as-shipping="formState.isSameAsShipping = $event"
          @update:billing-field="
            (field, value) => {
              if (formState.billingAddress) {
                (formState.billingAddress as any)[field] = value;
              }
            }
          "
        />

        <CheckoutMobileSummary
          :cart-items="cart.items"
          :item-count="cart.items.length"
          :subtotal="cart.totalPrice"
          :shipping-cost="shippingCost"
          :order-total="orderTotal"
        />

        <UButton
          type="submit"
          label="Pay now"
          size="xl"
          color="neutral"
          variant="solid"
          class="w-full justify-center"
        />
      </UForm>

      <aside class="hidden lg:block flex-1 sticky top-24 self-start">
        <CheckoutOrderSummary
          :cart-items="cart.items"
          :subtotal="cart.totalPrice"
          :shipping-cost="shippingCost"
          :order-total="orderTotal"
          :show-total="true"
        />
      </aside>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { SHIPPINGS } from '~/constant';
import {
  CheckoutFormSchema,
  type CheckoutFormSchema as CheckoutFormSchemaType,
} from '~/types/checkout';

useHead({ title: 'Checkout' });

const cart = useCartStore();
onMounted(() => cart.loadFromStorage());

const {
  currentUser,
  savedAddresses,
  defaultAddress,
  hasReachedAddressLimit,
  refreshAddresses,
  isLoadingUser,
  isLoadingAddresses,
  isLoggingOut,
  handleLogout,
} = useCheckoutUser();

const {
  formState,
  selectedShipping,
  shippingCost,
  applyAddressToForm,
  resetForm,
} = useCheckoutForm(
  defaultAddress,
  savedAddresses,
  computed(() => currentUser.value?.email),
);

const orderTotal = computed(() => cart.totalPrice + shippingCost.value);

const isShippingAddressComplete = computed(
  () =>
    !!(
      formState.address &&
      formState.city &&
      formState.province &&
      formState.postal_code
    ),
);

const toast = useToast();

async function handleFormSubmit(
  event: FormSubmitEvent<CheckoutFormSchemaType>,
) {
  const payload = { ...event.data } as any;
  delete payload.is_default;
  if (payload.isSameAsShipping) {
    delete payload.billingAddress;
  } else if (payload.billingAddress) {
    delete payload.billingAddress.is_default;
  }

  try {
    toast.add({
      title: 'Payment successful',
      description: 'Thank you for your purchase.',
      color: 'success',
    });
    resetForm();
  } catch (error) {
    console.error('[Checkout] Submission failed:', error);
    toast.add({
      title: 'Payment failed',
      description: 'Something went wrong. Please try again.',
      color: 'error',
    });
  }
}
</script>
