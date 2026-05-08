<template>
  <UHeader title="Store" to="/" toggle-side="left" class="bg-gray-50 border-0">
    <UNavigationMenu
      variant="link"
      content-orientation="vertical"
      arrow
      :items="items"
      class="w-full"
    />

    <template #right>
      <USlideover title="Your cart" v-model:open="isCartOpen">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-shopping-cart"
          aria-label="Cart"
          class="relative"
        >
          <span
            v-if="cart.items.length > 0"
            class="absolute -top-2 -right-2 rounded-full bg-neutral-800 size-5 flex items-center justify-center text-xs text-white"
            >{{ cart.totalItems }}</span
          >
        </UButton>

        <template #body>
          <div
            v-if="cart.items.length === 0"
            class="flex flex-col items-center justify-center h-full gap-y-5"
          >
            <p class="text-2xl">Your cart is empty</p>
            <UButton
              label="Continue shopping"
              color="neutral"
              variant="solid"
              size="xl"
              to="/catalogs/all-products"
              @click="isCartOpen = false"
            />
          </div>

          <div v-else class="flex flex-col h-full overflow-hidden">
            <div class="flex-1 overflow-y-auto pr-2 flex flex-col gap-y-4">
              <div
                v-for="item in cart.items"
                :key="item.key"
                class="flex gap-x-4"
              >
                <NuxtImg
                  :src="item.image"
                  class="size-20 object-cover rounded-md"
                  loading="lazy"
                />
                <div class="flex-1 flex flex-col">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="text-sm font-medium line-clamp-2">
                        {{ item.productName }}
                      </h3>
                      <p class="text-xs text-gray-500 mt-1">
                        {{ item.color }} / {{ item.size }}
                      </p>
                    </div>
                    <span
                      class="text-sm font-semibold whitespace-nowrap ml-2"
                      >{{ formatPrice(item.price * item.quantity) }}</span
                    >
                  </div>
                  <div class="flex items-center justify-between mt-auto pt-2">
                    <UInputNumber
                      size="sm"
                      class="w-24"
                      :model-value="item.quantity"
                      @update:model-value="
                        (val) => cart.updateQuantity(item.key, val)
                      "
                    />
                    <UButton
                      color="error"
                      variant="ghost"
                      icon="i-heroicons-trash"
                      size="sm"
                      @click="cart.removeItem(item.key)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-4 border-t mt-4 shrink-0">
              <div class="flex justify-between text-lg font-semibold mb-4">
                <span>Total</span>
                <span>{{ formatPrice(cart.totalPrice) }}</span>
              </div>
              <UButton
                class="w-full flex justify-center"
                color="neutral"
                variant="solid"
                size="xl"
                to="/checkout"
                @click="isCartOpen = false"
                >Checkout</UButton
              >
            </div>
          </div>
        </template>
      </USlideover>

      <UButton
        color="neutral"
        variant="ghost"
        icon="iconamoon:profile-light"
        aria-label="Profile"
        to="/profile"
      />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { computed, onMounted, ref } from 'vue';
import type { Catalog } from '~/types/category';

const route = useRoute();
const cart = useCartStore();

const isCartOpen = ref(false);

onMounted(() => {
  cart.loadFromStorage();
});

const { data: catalogs } = await useApi<Catalog[]>('/api/catalogs');

const formatPrice = formatCurrency;

const items = computed<NavigationMenuItem[]>(() => {
  const catalogChildren: Array<{ label: string; to: string }> = [];

  if (catalogs.value) {
    const apiCatalogs = catalogs.value.data;

    if (Array.isArray(apiCatalogs)) {
      apiCatalogs.forEach((cat) => {
        catalogChildren.push({
          label: cat.name,
          to: `/catalogs/${cat.slug}`,
        });
      });
    }
  }

  catalogChildren.push({ label: 'All Products', to: '/catalogs/all-products' });

  return [
    {
      label: 'Catalogs',
      to: '/catalogs',
      active: route.path.startsWith('/catalogs'),
      children: catalogChildren,
    },
    { label: 'Contact', to: '#', active: route.path.startsWith('/contact') },
    { label: 'Gallery', to: '#', active: route.path.startsWith('/gallery') },
    { label: 'About Us', to: '#', active: route.path.startsWith('/about') },
  ];
});
</script>
