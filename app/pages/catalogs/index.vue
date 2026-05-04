<template>
  <div class="py-12 min-h-screen">
    <UContainer>
      <div class="mb-12 text-center">
        <h1
          class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
        >
          All Catalogs
        </h1>
        <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our wide range of categories. Find the perfect items that suit
          your lifestyle and needs.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <NuxtLink
          v-for="category in categories"
          :key="category.slug"
          :to="`/catalogs/${category.slug}`"
          class="group"
        >
          <UCard
            class="h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg dark:hover:shadow-primary-500/10"
          >
            <div
              class="aspect-w-16 aspect-h-9 w-full bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden mb-4"
            >
              <div
                class="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-primary-500 transition-colors"
              >
                <UIcon :name="category.icon" class="w-12 h-12" />
              </div>
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors"
            >
              {{ category.name }}
            </h3>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {{ category.description }}
            </p>
          </UCard>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';

const categories = [
  {
    name: 'Apparel',
    slug: 'apparel',
    description: 'Trendy and comfortable clothing for all seasons.',
    icon: 'i-heroicons-sparkles',
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'The latest gadgets and high-tech devices.',
    icon: 'i-heroicons-device-phone-mobile',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Watches, jewelry, and styling essentials.',
    icon: 'i-heroicons-clock',
  },
  {
    name: 'Home',
    slug: 'home',
    description: 'Furniture and decor to brighten your living space.',
    icon: 'i-heroicons-home',
  },
];

useHead({
  title: 'All Catalogs - Store',
});
</script>
