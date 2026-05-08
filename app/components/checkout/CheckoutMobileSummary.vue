<template>
  <section class="lg:hidden">
    <UCollapsible
      v-model:open="isOpen"
      class="relative z-10 flex flex-col gap-y-5"
    >
      <!-- Toggle Header -->
      <div role="button" class="relative flex flex-col items-center">
        <div class="w-full grid grid-cols-3">
          <div>
            <h4 class="text-xl font-semibold">Total</h4>
            <p class="text-sm text-neutral-400">{{ itemCount }} items</p>
          </div>

          <UIcon
            name="i-heroicons-chevron-down"
            class="self-end justify-self-center size-4 transition-transform duration-300"
            :class="isOpen ? 'rotate-180' : 'animate-bounce'"
          />

          <p class="self-center justify-self-end text-xl font-semibold">
            {{ formatCurrency(orderTotal) }}
          </p>
        </div>
      </div>

      <template #content>
        <div class="pt-3 pr-3">
          <CheckoutOrderSummary
            :cart-items="cartItems"
            :subtotal="subtotal"
            :shipping-cost="shippingCost"
            :order-total="orderTotal"
            :show-total="false"
            badge-text-class=""
          />
        </div>
      </template>
    </UCollapsible>
  </section>
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

const props = defineProps<{
  cartItems: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingCost: number;
  orderTotal: number;
}>();

const isOpen = ref(false);
</script>
