<template>
  <UError
    v-if="status === 'error'"
    :clear="{
      color: 'neutral',
      variant: 'solid',
    }"
    :error="{
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Failed to load products',
      message:
        error?.message ||
        'An unexpected error occurred while fetching the data.',
    }"
  />

  <UMain v-else class="flex">
    <UContainer
      class="py-4 flex-1 flex flex-col gap-6 md:gap-8 md:py-6 lg:gap-10 lg:py-8 lg:grid lg:grid-cols-5"
    >
      <div class="lg:hidden pr-2.5 flex items-center justify-between">
        <USlideover title="Filter and sort">
          <UButton
            label="Filter and sort"
            variant="ghost"
            color="neutral"
            icon="i-heroicons-adjustments-horizontal"
          />

          <template #body>
            <UCollapsible default-open class="flex flex-col gap-2">
              <UButton
                label="Availability"
                color="neutral"
                variant="ghost"
                trailing-icon="i-lucide-chevron-down"
                class="justify-between"
              />

              <template #content>
                <div class="px-2.5 flex flex-col gap-y-3">
                  <UCheckboxGroup
                    v-model="availability"
                    value-key="id"
                    :items="availability_items"
                    color="neutral"
                  />
                </div>
              </template>
            </UCollapsible>

            <USeparator class="my-4" />

            <UCollapsible default-open class="flex flex-col gap-2">
              <UButton
                label="Price"
                color="neutral"
                variant="ghost"
                trailing-icon="i-lucide-chevron-down"
                class="justify-between"
              />

              <template #content>
                <div class="px-2.5 flex items-center gap-x-2">
                  <span class="text-xs">Rp.</span>
                  <UInput
                    v-model="price_min"
                    placeholder="From"
                    type="number"
                  />
                  <UInput v-model="price_max" placeholder="To" type="number" />
                </div>
              </template>
            </UCollapsible>

            <USeparator class="my-4" />

            <div class="px-2.5 flex flex-col gap-y-2">
              <label for="sort_by" class="py-1.5 text-sm font-medium"
                >Sort by:</label
              >
              <USelect
                id="sort_by"
                v-model="sort"
                value-key="id"
                :items="sort_items"
                class="w-full"
              />
            </div>
          </template>
        </USlideover>

        <p class="text-sm">2 products</p>
      </div>

      <div
        v-if="activeFilters.length"
        class="lg:hidden flex flex-wrap items-center gap-2"
      >
        <UBadge
          v-for="filter in activeFilters"
          :key="filter.key"
          color="neutral"
          variant="outline"
          class="flex items-center gap-x-1"
        >
          <span class="text-xs">{{ filter.label }}</span>
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            icon="i-lucide-x"
            class="w-4 h-4 min-w-0 p-0 ml-1"
            @click="removeFilter(filter.key)"
          />
        </UBadge>

        <UButton
          label="Remove All"
          size="xs"
          variant="soft"
          color="error"
          icon="i-lucide-x"
          @click="removeAllFilters"
        />
      </div>

      <div class="hidden lg:block col-span-1">
        <h3>Filters:</h3>

        <div
          v-if="activeFilters.length"
          class="hidden lg:flex flex-wrap items-center gap-2 mt-4"
        >
          <UBadge
            v-for="filter in activeFilters"
            :key="filter.key"
            color="neutral"
            variant="outline"
            class="flex items-center gap-x-1"
          >
            <span class="text-xs">{{ filter.label }}</span>
            <UButton
              size="xs"
              variant="ghost"
              color="neutral"
              icon="i-lucide-x"
              class="w-4 h-4 min-w-0 p-0 ml-1"
              @click="removeFilter(filter.key)"
            />
          </UBadge>

          <UButton
            label="Remove All"
            size="xs"
            variant="soft"
            color="error"
            icon="i-lucide-x"
            @click="removeAllFilters"
          />
        </div>

        <USeparator class="my-4" />

        <UCollapsible default-open class="flex flex-col gap-2">
          <UButton
            label="Availability"
            color="neutral"
            variant="ghost"
            trailing-icon="i-lucide-chevron-down"
            class="justify-between"
          />

          <template #content>
            <div class="px-2.5 flex flex-col gap-y-3">
              <UCheckboxGroup
                v-model="availability"
                value-key="id"
                :items="availability_items"
                color="neutral"
              />
            </div>
          </template>
        </UCollapsible>

        <USeparator class="my-4" />

        <UCollapsible default-open class="flex flex-col gap-2">
          <UButton
            label="Price"
            color="neutral"
            variant="ghost"
            trailing-icon="i-lucide-chevron-down"
            class="justify-between"
          />

          <template #content>
            <div class="px-2.5 flex items-center gap-x-2">
              <span class="text-xs">Rp.</span>
              <UInput v-model="price_min" placeholder="From" type="number" />
              <UInput v-model="price_max" placeholder="To" type="number" />
            </div>
          </template>
        </UCollapsible>
      </div>

      <div class="flex-1 col-span-4 flex flex-col">
        <div class="hidden lg:flex items-center justify-end gap-9">
          <div class="flex-1 flex items-center justify-end gap-x-2">
            <label for="sort_by" class="shrink-0 py-1.5 text-sm font-medium"
              >Sort by:</label
            >
            <USelect
              id="sort_by"
              v-model="sort"
              value-key="id"
              :items="sort_items"
              class="w-36"
              variant="ghost"
            />
          </div>

          <p class="text-sm">2 products</p>
        </div>

        <ul
          v-if="products?.data.length"
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6"
        >
          <li v-for="(product, index) in products?.data" :key="product.id">
            <NuxtLink :to="`/products/${product.slug}`" class="group relative">
              <UBadge
                v-if="product.total_stock === 0"
                color="neutral"
                :class="[
                  'absolute top-2 left-2 z-20 transition-transform duration-200',
                  index % 2 === 0
                    ? 'group-hover:rotate-1'
                    : 'group-hover:-rotate-1',
                ]"
                >Sold out</UBadge
              >

              <div
                :class="[
                  'relative aspect-square overflow-hidden transition-transform duration-200 group-hover:scale-105',
                  index % 2 === 0
                    ? 'group-hover:rotate-1'
                    : 'group-hover:-rotate-1',
                ]"
              >
                <NuxtImg
                  :src="product.image_primary"
                  :alt="product.name"
                  class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                />
                <NuxtImg
                  :src="product.image_hover"
                  :alt="product.name"
                  class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              </div>

              <div
                class="py-4 flex flex-col items-center justify-center gap-y-2"
              >
                <h2 class="text-sm group-hover:underline underline-offset-4">
                  {{ product.name }}
                </h2>
                <div class="flex items-center gap-x-2">
                  <p
                    class="text-xs"
                    :class="product.discount_price ? 'line-through' : ''"
                  >
                    {{ formatCurrency(product.price) }}
                  </p>
                  <p
                    v-if="product.discount_price > 0"
                    class="text-xs font-semibold"
                  >
                    {{ formatCurrency(product.discount_price) }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>

        <UEmpty
          v-else
          variant="naked"
          title="No products found"
          description="There are currently no products available to display."
          class="flex-1"
        />
      </div>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';
import { computed } from 'vue';
import type { Product } from '~/types/product';

interface ActiveFilter {
  key: string;
  label: string;
}

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const title: Record<string, string> = {
  'hoodie-sweatshirt': 'Hoodies & Sweatshirts',
  'sweater-cardigan': 'Sweaters & Cardigans',
  'short-pants': 'Short Pants',
};

const availability_items = ref<Array<{ label: string; id: string }>>([
  { label: 'In stock', id: 'in_stock' },
  { label: 'Out of stock', id: 'out_of_stock' },
]);
const availability = ref<string[]>([]);
const price_min = ref('');
const price_max = ref('');

const activeFilters = computed<ActiveFilter[]>(() => {
  const filters: ActiveFilter[] = [];

  for (const id of availability.value) {
    const item = availability_items.value.find((i) => i.id === id);
    if (item) {
      filters.push({
        key: `availability:${id}`,
        label: item.label as string,
      });
    }
  }

  if (price_min.value) {
    filters.push({
      key: 'price_min',
      label: `Min: Rp ${Number(price_min.value).toLocaleString('id-ID')}`,
    });
  }

  if (price_max.value) {
    filters.push({
      key: 'price_max',
      label: `Max: Rp ${Number(price_max.value).toLocaleString('id-ID')}`,
    });
  }

  return filters;
});

function removeFilter(key: string) {
  if (key.startsWith('availability:')) {
    const id = key.replace('availability:', '');
    availability.value = availability.value.filter((v) => v !== id);
  } else if (key === 'price_min') {
    price_min.value = '';
  } else if (key === 'price_max') {
    price_max.value = '';
  }
}

function removeAllFilters() {
  availability.value = [];
  price_min.value = '';
  price_max.value = '';
}

const debounced_price_min = useDebounce(price_min, 500);
const debounced_price_max = useDebounce(price_max, 500);

const sort_items = ref<SelectItem[]>([
  {
    label: 'A-Z',
    id: 'a_z',
  },
  {
    label: 'Z-A',
    id: 'z_a',
  },
  {
    label: 'Cheapest',
    id: 'price_asc',
  },
  {
    label: 'Most Expensive',
    id: 'price_desc',
  },
  {
    label: 'Newest',
    id: 'newest',
  },
  {
    label: 'Oldest',
    id: 'oldest',
  },
]);
const sort = ref('newest');

const queryParams = computed(() => ({
  catalog_slug: slug.value,
  search: undefined,
  availability: availability.value.length ? availability.value : undefined,
  price_min: debounced_price_min.value || undefined,
  price_max: debounced_price_max.value || undefined,
  sort: sort.value || 'newest',
  page: 1,
  per_page: 20,
}));

const {
  data: products,
  status,
  error,
  refresh,
} = await useApi<Product[]>('/api/products', {
  query: queryParams,
});

useHead({
  title: `${title[slug.value] || slug.value.charAt(0).toUpperCase() + slug.value.slice(1)}`,
});
</script>
