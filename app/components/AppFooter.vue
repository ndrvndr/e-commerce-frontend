<template>
  <UFooter class="bg-gray-50">
    <template #left>
      <p class="text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        icon="mdi:linkedin"
        color="neutral"
        variant="ghost"
        to="https://www.linkedin.com/in/ndrvndr/"
        target="_blank"
        aria-label="Discord"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/ndrvndr/"
        target="_blank"
        aria-label="X"
      />
      <UButton
        icon="mdi:world"
        color="neutral"
        variant="ghost"
        to="https://andreavindra.vercel.app/"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const items: NavigationMenuItem[] = [
  {
    label: 'Refund Policy',
    to: '#',
  },
  {
    label: 'Privacy Policy',
    to: '#',
  },
  {
    label: 'Shipping Policy',
    to: '#',
  },
];
</script>
