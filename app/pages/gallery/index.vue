<template>
  <UMain>
    <UContainer
      class="max-w-7xl mx-auto py-4 space-y-8 md:pt-36 md:py-6 lg:py-8 lg:space-y-12"
    >
      <div
        class="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-end"
      >
        <div class="space-y-3">
          <p class="text-xs text-neutral-500">Est. MMXXIV</p>
          <h1 class="text-3xl">Still Untitled</h1>
          <p class="text-sm">
            An ongoing archive of images that just feel right.
          </p>
        </div>

        <UButton
          label="@ndr.vndr"
          to="https://www.instagram.com/ndr.vndr/"
          target="_blank"
          variant="solid"
          color="neutral"
          size="xl"
          class="w-fit h-fit"
        />
      </div>

      <div class="columns-2 gap-1 md:columns-3 lg:columns-4">
        <NuxtImg
          v-for="image in 24"
          :key="image"
          :src="`${baseUrl}/image-${String(image).padStart(2, '0')}.webp`"
          class="mb-1"
          loading="lazy"
        />
      </div>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
useHead({
  title: 'Gallery',
});

const config = useRuntimeConfig();
const baseUrl = `${config.public.r2Url}/gallery`;
</script>
