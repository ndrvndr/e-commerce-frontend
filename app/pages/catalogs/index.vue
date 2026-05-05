<template>
  <UError
    v-if="status === 'error'"
    :clear="{
      color: 'neutral',
      variant: 'solid',
    }"
    :error="{
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Failed to load catalogs',
      message:
        error?.message ||
        'An unexpected error occurred while fetching the data.',
    }"
  />

  <UMain v-else class="flex">
    <UContainer v-if="catalogs?.data.length" class="py-4 md:py-6 lg:py-8">
      <div class="pb-5">
        <h1 class="text-4xl">Catalogs</h1>
      </div>

      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6">
        <li v-for="(catalog, index) in catalogs?.data" :key="catalog.id">
          <NuxtLink :to="`/catalogs/${catalog.slug}`" class="group">
            <NuxtImg
              :src="catalog.image"
              :alt="catalog.name"
              :class="[
                'aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-200',
                index % 2 === 0
                  ? 'group-hover:rotate-1'
                  : 'group-hover:-rotate-1',
              ]"
              loading="lazy"
            />

            <div
              class="py-4 flex items-center justify-center gap-x-2 group-hover:underline underline-offset-4"
            >
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

    <UContainer v-else class="flex-1 grid place-items-center">
      <UEmpty
        variant="naked"
        title="No catalogs found"
        description="There are currently no catalogs available to display."
      />
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
import type { Catalog } from '~/types/category';

const {
  data: catalogs,
  status,
  error,
} = await useApi<Catalog[]>('/api/catalogs');

useHead({
  title: 'Catalogs',
});
</script>
