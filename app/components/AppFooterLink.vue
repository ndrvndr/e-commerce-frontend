<template>
  <li>
    <NuxtLink
      :to="to"
      class="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
    >
      <slot />
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>
