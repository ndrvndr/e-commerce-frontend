<template>
  <UContainer class="flex-1 flex flex-col w-full max-w-[1800px]">
    <div class="py-5">
      <h1 class="text-4xl">Catalogs</h1>
    </div>

    <div
      v-if="status === 'error'"
      class="flex-1 flex flex-col items-center justify-center py-10 space-y-4 max-w-lg mx-auto"
    >
      <UAlert
        color="error"
        variant="subtle"
        title="Failed to load catalogs"
        :description="
          error?.message ||
          'An unexpected error occurred while fetching the data.'
        "
        icon="i-heroicons-exclamation-triangle"
      />
      <UButton
        @click="() => refresh()"
        color="neutral"
        variant="solid"
        icon="i-heroicons-arrow-path"
      >
        Try Again
      </UButton>
    </div>

    <ul
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8"
    >
      <li v-for="catalog in catalogs?.data" :key="catalog.id">
        <NuxtLink :to="`/catalogs/${catalog.slug}`" class="group">
          <NuxtImg
            :src="catalog.image"
            :alt="catalog.name"
            format="webp"
            sizes="sm:200px md:300px lg:400px"
            class="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-200"
          />

          <div class="py-4 flex items-center justify-center gap-x-2">
            <h2 class="text-sm">{{ catalog.name }}</h2>
            <UButton
              color="neutral"
              variant="ghost"
              icon="formkit:arrowright"
              aria-label="View Catalog"
              size="sm"
            />
          </div>
        </NuxtLink>
      </li>
    </ul>
  </UContainer>
</template>

<script setup lang="ts">
import { useHead } from '#imports';
import type { Catalog } from '~/types/category';

const {
  data: catalogs,
  status,
  error,
  refresh,
} = await useApi<Catalog[]>('/api/catalogs');

useHead({
  title: 'Catalogs',
});
</script>
