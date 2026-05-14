<template>
  <div class="flex items-center gap-6 flex-wrap">
    <span
      class="text-[0.55rem] tracking-[0.15em] uppercase text-[#565d6e]"
      style="font-family:'IBM Plex Mono',monospace"
    >
      Legend —
    </span>

    <div
      v-for="item in items"
      :key="item.label"
      class="flex items-center gap-[0.45rem] text-[0.55rem] text-[#565d6e]"
      style="font-family:'IBM Plex Mono',monospace"
    >
      <div
        class="w-[22px] h-px border-t border-dashed"
        :style="{ borderColor: item.color ?? '#2a2f3d' }"
      />
      <span :style="item.color ? { color: item.color } : {}">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{ label: string; color?: string }>
}>()
</script>
