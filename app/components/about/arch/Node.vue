<template>
  <div
    class="relative px-3 py-[0.7rem] border-b border-[#1e2128] last:border-b-0 cursor-default transition-colors duration-150"
    :style="{ backgroundColor: hovered ? colors.nodeHover : colors.nodeBase }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- left accent bar -->
    <div
      class="absolute left-0 top-0 bottom-0 w-0.5"
      :style="{ backgroundColor: colors.accent }"
    />

    <!-- label -->
    <div class="flex items-center gap-[0.4rem] mb-[0.22rem]">
      <span class="text-[0.8rem] leading-none">{{ icon }}</span>
      <span class="text-[0.75rem] font-medium leading-tight text-[#dde1ea]">
        {{ label }}
      </span>
    </div>

    <!-- sub -->
    <p
      class="text-[0.53rem] tracking-[0.04em] leading-[1.5] text-[#565d6e] whitespace-pre-line"
      style="font-family:'IBM Plex Mono',monospace"
    >{{ sub }}</p>

    <!-- badges -->
    <div class="flex flex-wrap gap-1 mt-[0.35rem]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { COLOR_MAP, type LayerColor } from './types'

const props = defineProps<{
  icon: string
  label: string
  sub: string
  layerColor: LayerColor
}>()

const hovered = ref(false)
const colors = computed(() => COLOR_MAP[props.layerColor])
</script>
