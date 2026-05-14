<template>
  <span
    class="inline-block text-[0.46rem] tracking-[0.07em] px-[0.38rem] py-[0.13rem] uppercase border leading-none"
    style="font-family:'IBM Plex Mono',monospace"
    :style="{ backgroundColor: c.bg, color: c.text, borderColor: c.border }"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { BADGE_PALETTE, type BadgeColor } from './types'

const props = defineProps<{ color: BadgeColor }>()
const c = computed(() => BADGE_PALETTE[props.color])
</script>
