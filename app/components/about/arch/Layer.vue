<template>
  <div class="flex flex-col">
    <!-- header -->
    <div
      class="flex items-center gap-2 px-3 py-2 bg-[#111318] border border-[#1e2128]"
      :style="{ borderBottomWidth: '2px', borderBottomColor: c.accent }"
    >
      <div
        class="w-1.5 h-1.5 rounded-full shrink-0"
        :style="{ backgroundColor: c.accent }"
      />
      <span
        class="text-[0.58rem] tracking-[0.13em] uppercase font-semibold"
        style="font-family:'IBM Plex Mono',monospace"
        :style="{ color: c.accent }"
      >
        {{ name }}
      </span>
    </div>

    <!-- body -->
    <div class="border border-t-0" :style="{ borderColor: c.bodyBorder }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { COLOR_MAP, type LayerColor } from './types'

const props = defineProps<{
  name: string
  color: LayerColor
}>()

const c = computed(() => COLOR_MAP[props.color])
</script>
