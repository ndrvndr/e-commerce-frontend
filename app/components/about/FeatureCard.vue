<template>
  <div
    class="p-8 border-t-2 border-neutral-900 bg-neutral-100 hover:scale-105 transition-all duration-300"
  >
    <div class="text-2xl mb-4">{{ icon }}</div>
    <div class="font-bold mb-2">{{ title }}</div>
    <div class="text-sm mb-4">
      {{ desc }}
    </div>

    <div class="flex flex-wrap gap-1.5">
      <UBadge
        v-for="tag in tags"
        :key="tag"
        :label="tag"
        color="neutral"
        variant="outline"
        size="md"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}>();
</script>
