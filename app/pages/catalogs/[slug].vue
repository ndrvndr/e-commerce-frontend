<template>
  <div class="py-12">
    <UContainer>
      <div class="mb-8">
        <UBreadcrumb :links="links" class="mb-4" />
        <h1
          class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white capitalize"
        >
          {{ slug }} Catalog
        </h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Browse our latest collection of {{ slug }}.
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar filters -->
        <div class="w-full md:w-64 flex-shrink-0">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Filters
              </h3>
            </template>
            <div class="space-y-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >Category</label
                >
                <URadio
                  v-for="category in categories"
                  :key="category"
                  :model-value="slug"
                  :value="category"
                  :label="category"
                  class="capitalize mb-2"
                  disabled
                />
              </div>
              <UDivider />
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >Price Range</label
                >
                <URange v-model="priceRange" :min="0" :max="1000" />
                <div class="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$0</span>
                  <span>${{ priceRange }}</span>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Product Grid -->
        <div class="flex-1">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard v-for="i in 6" :key="i" class="flex flex-col">
              <div
                class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-800 mb-4 h-48"
              >
                <!-- Placeholder for product image -->
                <div
                  class="w-full h-full flex items-center justify-center text-gray-400"
                >
                  <UIcon name="i-heroicons-photo" class="w-12 h-12" />
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                  Product {{ i }}
                </h3>
                <p
                  class="mt-1 text-sm text-gray-500 dark:text-gray-400 capitalize"
                >
                  {{ slug }}
                </p>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <p class="text-lg font-medium text-gray-900 dark:text-white">
                  ${{ (Math.random() * 100 + 10).toFixed(2) }}
                </p>
                <UButton color="primary" variant="soft" size="sm"
                  >Add to cart</UButton
                >
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const links = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Catalogs', to: '/catalogs' },
  { label: slug.value, class: 'capitalize' },
]);

const categories = ['apparel', 'electronics', 'accessories', 'home'];
const priceRange = ref(500);

useHead({
  title: `${slug.value.charAt(0).toUpperCase() + slug.value.slice(1)} - Store`,
});
</script>
