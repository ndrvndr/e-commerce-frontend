<template>
  <section>
    <div class="space-y-1">
      <h2 class="text-xl font-semibold">Payment</h2>
      <p class="text-sm">All transactions are secure and encrypted.</p>
    </div>

    <UCard class="mt-4">
      <template #header>
        <p class="text-sm">{{ PAYMENT_GATEWAY_LABEL }}</p>
      </template>
      <template #footer>
        <p class="text-sm text-center">
          You'll be redirected to {{ PAYMENT_GATEWAY_LABEL }} to complete your
          purchase.
        </p>
      </template>
    </UCard>

    <div class="mt-7 space-y-3.5">
      <h3 class="font-semibold">Billing address</h3>

      <div
        class="border border-neutral-200 rounded-lg divide-y divide-neutral-200"
      >
        <div
          class="p-3.5 hover:bg-neutral-100 rounded-t-lg"
          :class="{ 'bg-neutral-100': isSameAsShipping }"
        >
          <label class="flex items-center gap-x-2.5 cursor-pointer">
            <input
              type="radio"
              name="billing"
              :value="true"
              :checked="isSameAsShipping"
              @change="emit('update:is-same-as-shipping', true)"
            />
            <span class="text-sm">Same as shipping address</span>
          </label>
        </div>

        <div>
          <div
            class="p-3.5 hover:bg-neutral-100 rounded-b-lg"
            :class="{ 'bg-neutral-100': !isSameAsShipping }"
          >
            <label class="flex items-center gap-x-2.5 cursor-pointer">
              <input
                type="radio"
                name="billing"
                :value="false"
                :checked="!isSameAsShipping"
                @change="emit('update:is-same-as-shipping', false)"
              />
              <span class="text-sm">Use a different billing address</span>
            </label>
          </div>

          <div
            v-if="!isSameAsShipping && billingAddress"
            class="space-y-4 p-3.5 border-t border-neutral-200"
          >
            <UFormField name="billingAddress.country">
              <USelectMenu
                :model-value="billingAddress.country"
                :items="countries"
                size="xl"
                class="w-full"
                placeholder="Country"
                @update:model-value="
                  emit('update:billing-field', 'country', $event)
                "
              />
            </UFormField>

            <div class="flex flex-col gap-4 md:flex-row">
              <UFormField name="billingAddress.first_name" class="w-full">
                <UInput
                  :model-value="billingAddress.first_name"
                  size="xl"
                  placeholder="First name"
                  class="w-full"
                  @update:model-value="
                    emit('update:billing-field', 'first_name', $event)
                  "
                />
              </UFormField>
              <UFormField name="billingAddress.last_name" class="w-full">
                <UInput
                  :model-value="billingAddress.last_name"
                  size="xl"
                  placeholder="Last name"
                  class="w-full"
                  @update:model-value="
                    emit('update:billing-field', 'last_name', $event)
                  "
                />
              </UFormField>
            </div>

            <UFormField name="billingAddress.address">
              <UInput
                :model-value="billingAddress.address"
                size="xl"
                placeholder="Address"
                class="w-full"
                @update:model-value="
                  emit('update:billing-field', 'address', $event)
                "
              />
            </UFormField>

            <UFormField name="billingAddress.note">
              <UInput
                :model-value="billingAddress.note"
                size="xl"
                placeholder="Apartment, suite, etc (optional)"
                class="w-full"
                @update:model-value="
                  emit('update:billing-field', 'note', $event)
                "
              />
            </UFormField>

            <UFormField name="billingAddress.city">
              <UInput
                :model-value="billingAddress.city"
                size="xl"
                placeholder="City"
                class="w-full"
                @update:model-value="
                  emit('update:billing-field', 'city', $event)
                "
              />
            </UFormField>

            <div class="flex flex-col gap-4 md:flex-row">
              <UFormField name="billingAddress.province" class="w-full">
                <USelectMenu
                  :model-value="billingAddress.province"
                  :items="provinces"
                  size="xl"
                  class="w-full"
                  placeholder="Province"
                  @update:model-value="
                    emit('update:billing-field', 'province', $event)
                  "
                />
              </UFormField>
              <UFormField name="billingAddress.postal_code" class="w-full">
                <UInput
                  :model-value="billingAddress.postal_code"
                  type="number"
                  placeholder="Postal code"
                  size="xl"
                  class="w-full"
                  @update:model-value="
                    emit('update:billing-field', 'postal_code', $event)
                  "
                />
              </UFormField>
            </div>

            <UFormField name="billingAddress.phone_number">
              <UInput
                :model-value="billingAddress.phone_number"
                type="tel"
                placeholder="Phone"
                size="xl"
                class="w-full"
                @update:model-value="
                  emit('update:billing-field', 'phone_number', $event)
                "
              />
            </UFormField>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { COUNTRIES, PROVINCES } from '~/constant';
import type { Address, AddressSchema } from '~/types/address';

const PAYMENT_GATEWAY_LABEL = 'Cards, Bank Transfers, QR, Ewallets';

const props = defineProps<{
  isSameAsShipping: boolean;
  billingAddress: Partial<Address> | undefined;
}>();

const emit = defineEmits<{
  'update:is-same-as-shipping': [value: boolean];
  'update:billing-field': [field: string, value: any];
}>();

const countries = ref(COUNTRIES);
const provinces = ref(PROVINCES);
</script>
