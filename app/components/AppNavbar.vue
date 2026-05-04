<template>
  <header class="sticky top-0 z-50 w-full bg-gray-50">
    <UContainer
      class="px-5 py-2.5 grid grid-cols-3 items-center max-w-[1800px]"
    >
      <div class="lg:hidden">
        <UButton
          variant="ghost"
          icon="line-md:menu"
          aria-label="Menu"
          size="xl"
        />
      </div>

      <div
        class="p-2 flex items-center gap-6 justify-self-center lg:justify-self-start"
      >
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl">
          <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6" />
          Store
        </NuxtLink>
      </div>

      <nav class="hidden lg:flex justify-center">
        <template v-for="link in navLinks" :key="link.to">
          <UPopover
            v-if="link.children"
            mode="hover"
            :content="{
              align: 'start',
              side: 'bottom',
              sideOffset: 1,
            }"
          >
            <button
              :class="[
                'p-3 text-sm hover:underline underline-offset-4 flex items-center gap-1 cursor-default outline-none',
                $route.path.startsWith(link.to) ? 'underline' : '',
              ]"
            >
              {{ link.label }}

              <UIcon name="i-heroicons-chevron-down-20-solid" class="size-4" />
            </button>

            <template #content>
              <div
                v-if="link.label === 'Catalogs' && status === 'pending'"
                class="size-48 flex justify-center items-center"
              >
                <UIcon
                  name="mingcute:loading-fill"
                  class="size-4 animate-spin opacity-75"
                />
              </div>

              <div v-else class="w-48 flex flex-col">
                <NuxtLink
                  v-for="child in link.children"
                  :key="child.to"
                  :to="child.to"
                  class="p-3 text-sm hover:underline underline-offset-4"
                  active-class="underline"
                >
                  {{ child.label }}
                </NuxtLink>
              </div>
            </template>
          </UPopover>

          <NuxtLink
            v-else
            :to="link.to"
            class="p-3 text-sm hover:underline underline-offset-4"
            active-class="underline"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
      </nav>

      <div class="flex items-center justify-end gap-1">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-magnifying-glass"
          aria-label="Search"
          size="xl"
        />
        <NuxtLink to="#">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-shopping-cart"
            aria-label="Cart"
            size="xl"
          />
        </NuxtLink>
        <NuxtLink to="#">
          <UButton
            color="neutral"
            variant="ghost"
            icon="iconamoon:profile-light"
            aria-label="Profile"
            size="xl"
            class="hidden md:flex"
          />
        </NuxtLink>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Category } from '~/types/category';

const { data: catalogsData, status } = await useApi<Category[]>(
  '/api/catalogs',
  {
    lazy: true,
  },
);

const navLinks = computed(() => {
  const catalogChildren: Array<{ label: string; to: string }> = [];

  if (catalogsData.value) {
    const apiCatalogs = catalogsData.value.data;

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
    { label: 'Home', to: '/' },
    {
      label: 'Catalogs',
      to: '/catalogs',
      children: catalogChildren,
    },
  ];
});
</script>
