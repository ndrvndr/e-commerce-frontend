<template>
  <section class="space-y-3.5">
    <UCollapsible v-model:open="isOpen" class="flex flex-col gap-y-3.5">
      <UButton
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-chevron-down"
        class="p-0 hover:bg-transparent active:bg-transparent text-xl font-semibold items-center justify-between"
      >
        <h2 class="text-xl font-semibold">Shipping method</h2>
      </UButton>

      <template #content>
        <div
          v-if="isAddressComplete"
          class="border border-neutral-200 rounded-lg divide-y divide-neutral-200"
        >
          <div
            v-for="(option, index) in shippingOptions"
            :key="option.courier_code"
            :class="[
              'p-3.5 hover:bg-neutral-100',
              index === 0 ? 'rounded-t-lg' : '',
              index === shippingOptions.length - 1 ? 'rounded-b-lg' : '',
              selectedCourierCode === option.courier_code
                ? 'bg-neutral-100'
                : '',
            ]"
          >
            <label class="flex items-start gap-x-2.5 text-sm">
              <input
                type="radio"
                name="shipping"
                class="mt-1"
                :value="option.courier_code"
                :checked="selectedCourierCode === option.courier_code"
                @change="emit('update:courier-code', option.courier_code)"
              />
              <span class="flex-1 flex flex-col">
                <span class="font-medium">{{ option.service_name }}</span>
                <span>{{ option.duration }}</span>
                <span
                  >{{ option.courier_name }} | Inc. Insurance
                  {{ formatCurrency(option.insurance) }}</span
                >
              </span>
              <span class="font-semibold">{{
                formatCurrency(option.price)
              }}</span>
            </label>
          </div>
        </div>

        <div
          v-else
          class="bg-neutral-100 p-4 rounded-lg text-sm text-neutral-400 text-center border border-neutral-200"
        >
          Enter your shipping address to view available shipping methods.
        </div>
      </template>
    </UCollapsible>

    <div v-if="!isOpen && selectedShipping" class="text-sm">
      <p class="font-medium">
        {{ selectedShipping.service_name }} ·
        {{ formatCurrency(selectedShipping.price) }}
      </p>
      <p>{{ selectedShipping.duration }}</p>
      <p>
        {{ selectedShipping.courier_name }} | Inc. Insurance
        {{ formatCurrency(selectedShipping.insurance) }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ShippingOption } from '~/types/checkout';
import { formatCurrency } from '~/utils/currency';

const props = defineProps<{
  shippingOptions: ShippingOption[];
  selectedCourierCode: string | undefined;
  selectedShipping: ShippingOption | undefined;
  isAddressComplete: boolean;
}>();

const emit = defineEmits<{
  'update:courier-code': [code: string];
}>();

const token = useCookie('auth_token').value;

const isOpen = ref(token ? false : true);
</script>
