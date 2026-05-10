<template>
  <UError
    v-if="status === 'error'"
    :clear="{
      color: 'neutral',
      variant: 'solid',
    }"
    :error="{
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Something went wrong',
    }"
  />

  <UMain v-else class="flex">
    <UContainer
      class="py-4 grid grid-cols-1 gap-y-6 md:py-6 md:grid-cols-2 md:gap-x-8 lg:py-8 lg:gap-x-12"
    >
      <div>
        <UCarousel
          ref="carousel"
          v-slot="{ item }"
          :items="filteredImages"
          :prev="{ onClick: onClickPrev }"
          :next="{ onClick: onClickNext }"
          class="w-full"
          @select="onSelect"
        >
          <NuxtImg
            :src="item"
            loading="lazy"
            class="w-full aspect-square object-cover"
          />
        </UCarousel>

        <UCarousel
          ref="thumbCarousel"
          v-slot="{ item, index: thumbIndex }"
          :items="filteredImages"
          :prev="{ onClick: onClickThumbPrev }"
          :next="{ onClick: onClickThumbNext }"
          class="mt-6 w-full"
          :ui="{
            item: 'basis-1/4',
          }"
        >
          <button
            class="w-full transition-opacity duration-200"
            :class="
              activeIndex === thumbIndex
                ? 'opacity-100'
                : 'opacity-30 hover:opacity-70'
            "
            @click="select(thumbIndex)"
          >
            <NuxtImg
              :src="item"
              loading="lazy"
              class="w-full aspect-square object-cover"
            />
          </button>
        </UCarousel>
      </div>

      <div class="flex flex-col">
        <div>
          <h1 class="text-3xl md:text-4xl">
            {{ product?.name }}
          </h1>

          <div class="mt-4 flex items-center gap-x-2">
            <span>
              {{ formatPrice(product?.discount_price ?? product?.price ?? 0) }}
            </span>
            <span
              v-if="
                product?.discount_price &&
                product.discount_price < product.price
              "
              class="text-sm line-through"
            >
              {{ formatPrice(product?.price ?? 0) }}
            </span>
          </div>
        </div>

        <USeparator class="my-7" />

        <div>
          <p class="mt-2">Material: {{ product?.material }}</p>
          <div class="mt-2" v-html="product?.description"></div>
        </div>

        <div v-if="availableColors.length" class="mt-10">
          <p class="text-sm">Color</p>
          <div class="mt-1.5 flex flex-wrap gap-2">
            <UButton
              v-for="color in availableColors"
              :key="color"
              :label="color"
              color="neutral"
              :variant="selectedColor === color ? 'solid' : 'outline'"
              size="lg"
              @click="selectColor(color)"
            />
          </div>
        </div>

        <div v-if="availableSizes.length" class="mt-3">
          <p class="text-sm">Size</p>
          <div class="mt-1.5 flex flex-wrap gap-2">
            <UButton
              v-for="size in availableSizes"
              :key="size"
              :label="size"
              color="neutral"
              :variant="selectedSize === size ? 'solid' : 'outline'"
              :disabled="getSizeStock(size) === 0"
              size="lg"
              @click="selectSize(size)"
            />
          </div>
        </div>

        <div class="mt-3">
          <p class="text-sm">Quantity</p>
          <UInputNumber v-model="quantity" size="xl" class="w-36 mt-1.5" />
        </div>

        <div class="flex flex-col gap-y-2.5 mt-5 lg:max-w-sm">
          <UButton
            class="flex justify-center"
            color="neutral"
            variant="outline"
            size="xl"
            :disabled="!canAddToCart"
            @click="addToCart"
          >
            Add to Cart
          </UButton>

          <UButton
            class="flex justify-center"
            color="neutral"
            variant="solid"
            size="xl"
            :disabled="!canAddToCart"
            @click="buyNow"
          >
            Buy It Now
          </UButton>
        </div>
      </div>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types/cart';
import type { Product } from '~/types/product';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data, status, error } = await useApi<Product>(
  `/api/products/${slug.value}`,
);

const product = computed<Product | null>(() => {
  const raw = data.value as unknown;
  if (!raw) return null;
  const wrapped = raw as { data?: Product };
  return wrapped.data ?? (raw as Product) ?? null;
});

const carousel = useTemplateRef('carousel');
const thumbCarousel = useTemplateRef('thumbCarousel');
const activeIndex = ref(0);

function onClickPrev() {
  activeIndex.value--;
}
function onClickNext() {
  activeIndex.value++;
}
function onSelect(index: number) {
  activeIndex.value = index;
}
function onClickThumbPrev() {
  thumbCarousel.value?.emblaApi?.scrollPrev();
}
function onClickThumbNext() {
  thumbCarousel.value?.emblaApi?.scrollNext();
}
function select(index: number) {
  activeIndex.value = index;
  carousel.value?.emblaApi?.scrollTo(index);
}

const selectedColor = ref<string>('');
const selectedSize = ref<string>('');
const quantity = ref(1);

const availableColors = computed<string[]>(() => {
  const p = product.value;
  if (!p?.variations) return [];
  return [...new Set(p.variations.map((v) => v.color))];
});

const availableSizes = computed<string[]>(() => {
  const p = product.value;
  if (!p?.variations || !selectedColor.value) return [];
  return p.variations
    .filter((v) => v.color === selectedColor.value)
    .map((v) => v.size);
});

watchEffect(() => {
  if (availableColors.value.length && !selectedColor.value) {
    selectedColor.value = availableColors.value[0]!;
  }
  if (availableSizes.value.length && !selectedSize.value) {
    selectedSize.value = availableSizes.value[0]!;
  }
});

const selectedVariant = computed(() => {
  const p = product.value;
  if (!p?.variations || !selectedColor.value || !selectedSize.value)
    return null;
  return (
    p.variations.find(
      (v) => v.color === selectedColor.value && v.size === selectedSize.value,
    ) ?? null
  );
});

const filteredImages = computed<string[]>(() => {
  const p = product.value;
  if (!p?.colors) return [];

  let images: string[] = [];

  if (selectedColor.value) {
    const colorEntry = p.colors.find((c) => c.color === selectedColor.value);
    if (colorEntry?.images.length) {
      images = [...colorEntry.images];
    }
  } else {
    images = p.colors.flatMap((c) => c.images);
  }

  // Menambahkan size chart image di akhir jika ada
  if (p.size_chart_image) {
    images.push(p.size_chart_image);
  }

  return images;
});

function getSizeStock(size: string): number {
  const p = product.value;
  if (!p?.variations || !selectedColor.value) return 0;
  return (
    p.variations.find((v) => v.color === selectedColor.value && v.size === size)
      ?.stock ?? 0
  );
}

function selectColor(color: string) {
  selectedColor.value = color;
  activeIndex.value = 0;
}

function selectSize(size: string) {
  if (getSizeStock(size) === 0) return;
  selectedSize.value = size;
  quantity.value = 1;
}

const canAddToCart = computed(() => {
  const variant = selectedVariant.value;
  return !!variant && variant.stock > 0 && quantity.value >= 1;
});

function increment() {
  const variant = selectedVariant.value;
  if (!variant) return;
  if (quantity.value < variant.stock) quantity.value++;
}
function decrement() {
  if (quantity.value > 1) quantity.value--;
}

const cart = useCartStore();
const toast = useToast();
const router = useRouter();

function buildCartPayload(): Omit<CartItem, 'key'> | null {
  const p = product.value;
  const variant = selectedVariant.value;
  if (!canAddToCart.value || !variant || !p) return null;
  const colorEntry = p.colors.find((c) => c.color === variant.color);
  return {
    productId: p.id,
    variantId: variant.id,
    productName: p.name,
    slug: p.slug,
    color: variant.color,
    size: variant.size,
    price:
      p.discount_price && p.discount_price < p.price
        ? p.discount_price
        : p.price,
    image: colorEntry?.images[0] ?? p.image_primary,
    quantity: quantity.value,
    stock: variant.stock,
  };
}

function addToCart() {
  const payload = buildCartPayload();
  if (!payload) return;
  cart.addItem(payload);
  toast.add({
    title: 'Added to cart',
    description: `${payload.productName} — ${payload.color} / ${payload.size} (x${payload.quantity})`,
    color: 'success',
    icon: 'i-heroicons-shopping-cart',
    duration: 3000,
  });
}

function buyNow() {
  const payload = buildCartPayload();
  if (!payload) return;
  cart.addItem(payload);
  router.push('/checkout');
}

const formatPrice = formatCurrency;

function colorHex(name: string): string {
  const map: Record<string, string> = {
    // basic
    black: '#1a1a1a',
    white: '#f5f5f5',
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#22c55e',
    yellow: '#eab308',
    orange: '#f97316',
    purple: '#a855f7',
    pink: '#ec4899',
    gray: '#9ca3af',
    grey: '#9ca3af',
    navy: '#1e3a5f',
    brown: '#92400e',
    beige: '#d4b896',
    cream: '#fffdd0',
    // add more as needed
  };
  return map[name.toLowerCase()] ?? name;
}

useHead({
  title: slug.value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),
});
</script>
