<template>
  <section class="space-y-3.5">
    <UCollapsible v-model:open="isOpen" class="flex flex-col gap-y-3.5">
      <UButton
        color="neutral"
        variant="ghost"
        :trailing-icon="
          isOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
        "
        class="p-0 hover:bg-transparent active:bg-transparent text-xl font-semibold items-start justify-between w-full"
      >
        <h2 class="text-xl font-semibold">Delivery</h2>
      </UButton>

      <template #content>
        <div v-if="hasDefaultAddress" class="space-y-3.5">
          <div
            class="border border-neutral-200 rounded-lg divide-y divide-neutral-200"
          >
            <div
              v-for="(address, index) in savedAddresses"
              :key="address.id"
              :class="[
                'p-3.5 hover:bg-neutral-100',
                index === 0 ? 'rounded-t-lg' : '',
                index === savedAddresses.length - 1 ? 'rounded-b-lg' : '',
                selectedAddress === address.address ? 'bg-neutral-100' : '',
              ]"
            >
              <label class="flex items-start gap-x-2.5 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="delivery_address"
                  class="mt-1"
                  :value="address.address"
                  :checked="selectedAddress === address.address"
                  @change="emit('select-address', address)"
                />

                <span class="flex-1 flex items-start justify-between gap-x-2.5">
                  <span class="flex-1 flex flex-col">
                    <span class="font-medium">
                      {{ address.first_name }} {{ address.last_name }},
                      {{ address.address }}
                    </span>
                    <span class="text-neutral-400">
                      {{ address.city }}, {{ address.province }}
                      {{ address.postal_code }},
                      {{ address.country }}
                    </span>
                    <UBadge
                      v-if="address.is_default"
                      label="Default"
                      variant="solid"
                      color="neutral"
                      size="sm"
                      class="w-fit mt-1"
                    />
                  </span>

                  <USlideover
                    :title="`Edit Address`"
                    v-model:open="editOpenMap[address.id]"
                  >
                    <UButton
                      v-if="selectedAddress === address.address"
                      type="button"
                      icon="tabler:pencil"
                      color="neutral"
                      variant="ghost"
                      size="sm"
                    />
                    <template #body>
                      <AddressForm
                        :id="address.id"
                        :address="{
                          country: address.country,
                          first_name: address.first_name,
                          last_name: address.last_name,
                          address: address.address,
                          note: address.note,
                          city: address.city,
                          province: address.province,
                          postal_code: address.postal_code,
                          phone_number: address.phone_number,
                          is_default: address.is_default,
                        }"
                        :refresh="refreshAddresses"
                        @success="editOpenMap[address.id] = false"
                      />
                    </template>
                  </USlideover>
                </span>
              </label>
            </div>
          </div>

          <USlideover
            v-if="!hasReachedAddressLimit"
            title="Add Address"
            v-model:open="isAddAddressOpen"
          >
            <UButton
              type="button"
              variant="ghost"
              color="neutral"
              icon="tabler:plus"
            >
              Use a different address
            </UButton>
            <template #body>
              <AddressForm
                :refresh="refreshAddresses"
                @success="isAddAddressOpen = false"
              />
            </template>
          </USlideover>
        </div>

        <div v-else class="space-y-4">
          <UFormField name="country">
            <USelectMenu
              :model-value="formState.country"
              :items="countries"
              size="xl"
              class="w-full"
              placeholder="Country"
              @update:model-value="emit('update:field', 'country', $event)"
            />
          </UFormField>

          <div class="flex flex-col gap-4 md:flex-row">
            <UFormField name="first_name" class="w-full">
              <UInput
                :model-value="formState.first_name"
                size="xl"
                placeholder="First name"
                class="w-full"
                @update:model-value="emit('update:field', 'first_name', $event)"
              />
            </UFormField>
            <UFormField name="last_name" class="w-full">
              <UInput
                :model-value="formState.last_name"
                size="xl"
                placeholder="Last name"
                class="w-full"
                @update:model-value="emit('update:field', 'last_name', $event)"
              />
            </UFormField>
          </div>

          <UFormField name="address">
            <UInput
              :model-value="formState.address"
              size="xl"
              placeholder="Address"
              class="w-full"
              @update:model-value="emit('update:field', 'address', $event)"
            />
          </UFormField>

          <UFormField name="note">
            <UInput
              :model-value="formState.note"
              size="xl"
              placeholder="Apartment, suite, etc (optional)"
              class="w-full"
              @update:model-value="emit('update:field', 'note', $event)"
            />
          </UFormField>

          <UFormField name="city">
            <UInput
              :model-value="formState.city"
              size="xl"
              placeholder="City"
              class="w-full"
              @update:model-value="emit('update:field', 'city', $event)"
            />
          </UFormField>

          <div class="flex flex-col gap-4 md:flex-row">
            <UFormField name="province" class="w-full">
              <USelectMenu
                :model-value="formState.province"
                :items="provinces"
                size="xl"
                class="w-full"
                placeholder="Province"
                @update:model-value="emit('update:field', 'province', $event)"
              />
            </UFormField>
            <UFormField name="postal_code" class="w-full">
              <UInput
                :model-value="formState.postal_code"
                type="number"
                placeholder="Postal code"
                size="xl"
                class="w-full"
                @update:model-value="
                  emit('update:field', 'postal_code', $event)
                "
              />
            </UFormField>
          </div>

          <UFormField name="phone_number">
            <UInput
              :model-value="formState.phone_number"
              type="tel"
              placeholder="Phone"
              size="xl"
              class="w-full"
              @update:model-value="emit('update:field', 'phone_number', $event)"
            />
          </UFormField>
        </div>
      </template>
    </UCollapsible>

    <p
      v-if="!isOpen && formState.address"
      class="text-sm font-normal text-left"
    >
      {{ formState.first_name }} {{ formState.last_name }},
      {{ formState.address }}, {{ formState.city }}, {{ formState.province }}
      {{ formState.postal_code }},
      {{ formState.country }}
    </p>
  </section>
</template>

<script setup lang="ts">
import type { AddressWithId } from '~/types/address';
import { COUNTRIES, PROVINCES } from '~/constant';
import type { CheckoutFormSchema } from '~/types/checkout';

const props = defineProps<{
  savedAddresses: AddressWithId[];
  hasDefaultAddress: boolean;
  hasReachedAddressLimit: boolean;
  selectedAddress: string | undefined;
  formState: Partial<CheckoutFormSchema>;
  refreshAddresses: () => Promise<void>;
}>();

const emit = defineEmits<{
  'select-address': [address: AddressWithId];
  'update:field': [field: keyof CheckoutFormSchema, value: any];
}>();

const token = useCookie('auth_token').value;

const isOpen = ref(token ? false : true);
const isAddAddressOpen = ref(false);
const editOpenMap = reactive<Record<number, boolean>>({});

const countries = ref(COUNTRIES);
const provinces = ref(PROVINCES);
</script>
