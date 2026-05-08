<template>
  <div :class="containerClass">
    <div class="space-y-3.5">
      <div
        v-for="item in cartItems"
        :key="item.key"
        class="flex items-center gap-x-3.5"
      >
        <div class="relative z-20">
          <NuxtImg
            :src="item.image"
            class="size-16 object-cover rounded-md"
            loading="lazy"
          />
          <span
            :class="[
              'absolute -top-3 -right-3 bg-neutral-800 size-6 flex items-center justify-center rounded-sm text-xs',
              badgeTextClass,
            ]"
          >
            {{ item.quantity }}
          </span>
        </div>

        <div class="flex-1">
          <div class="flex justify-between gap-x-3.5">
            <h3 class="text-sm">{{ item.productName }}</h3>
            <p class="text-sm">
              {{ formatCurrency(item.price * item.quantity) }}
            </p>
          </div>
          <p class="text-xs text-neutral-400">
            {{ item.color }} / {{ item.size }}
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <div class="text-sm flex items-center justify-between gap-x-3.5">
        <p>Subtotal</p>
        <p>{{ formatCurrency(subtotal) }}</p>
      </div>
      <div class="text-sm flex items-center justify-between gap-x-3.5">
        <p>Shipping</p>
        <p>{{ formatCurrency(shippingCost) }}</p>
      </div>
    </div>

    <div
      v-if="showTotal"
      class="text-xl font-semibold flex items-center justify-between gap-x-3.5"
    >
      <p>Total</p>
      <p>{{ formatCurrency(orderTotal) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '~/utils/currency';

interface CartItem {
  key: string;
  image: string;
  productName: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

const props = withDefaults(
  defineProps<{
    cartItems: CartItem[];
    subtotal: number;
    shippingCost: number;
    orderTotal: number;
    showTotal?: boolean;
    containerClass?: string;
    badgeTextClass?: string;
  }>(),
  {
    showTotal: true,
    containerClass: 'space-y-5',
    badgeTextClass: 'text-white',
  },
);
</script>
