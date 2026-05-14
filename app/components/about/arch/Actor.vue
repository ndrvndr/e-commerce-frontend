<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <div
      class="w-12 h-12 rounded-full border border-[#2a2f3d] bg-[#111318] flex items-center justify-center text-[1.3rem]"
    >
      {{ icon }}
    </div>
    <p
      class="text-[0.54rem] tracking-[0.12em] uppercase text-[#565d6e] text-center leading-[1.4]"
      style="font-family:'IBM Plex Mono',monospace"
    >
      {{ label }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  label: string
}>()
</script>
