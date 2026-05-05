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
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-heroicons-magnifying-glass"
        aria-label="Search"
      />
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-heroicons-shopping-cart"
        aria-label="Cart"
        to="#"
      />
      <UButton
        color="neutral"
        variant="ghost"
        icon="iconamoon:profile-light"
        aria-label="Profile"
        to="#"
      />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { computed } from 'vue';
import type { Catalog } from '~/types/category';

const route = useRoute();

const { data: catalogs } = await useApi<Catalog[]>('/api/catalogs');

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
    { label: 'Home', to: '/', active: route.path === '/' },
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
