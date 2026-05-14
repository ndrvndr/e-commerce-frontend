<!-- Vertical wire connecting top row to bottom infra row -->
<template>
  <div class="relative flex items-center justify-center">
    <svg
      class="absolute inset-0 w-full h-full overflow-visible"
      viewBox="0 0 210 48"
      preserveAspectRatio="none"
    >
      <line x1="105" y1="0" x2="105" y2="48"
            :stroke="strokeColor" stroke-width="1" stroke-dasharray="4 3" />
      <polygon points="101,42 105,48 109,42" :fill="arrowColor" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  strokeColor: string
  arrowColor: string
}>()
</script>
