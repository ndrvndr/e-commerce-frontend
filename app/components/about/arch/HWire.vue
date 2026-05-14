<!--
  Horizontal wire connector between columns.
  type:
    'right'         – dashed line + arrowhead pointing right
    'left'          – dashed line + arrowhead pointing left
    'bidirectional' – two dashed lines: top→right, bottom→left
-->
<template>
  <div class="relative self-stretch">
    <!-- SVG wires -->
    <svg
      class="absolute inset-0 w-full h-full overflow-visible"
      viewBox="0 0 56 100"
      preserveAspectRatio="none"
    >
      <!-- right arrow -->
      <template v-if="type === 'right'">
        <line x1="0" y1="50%" x2="56" y2="50%"
              :stroke="primaryStroke" stroke-width="1" stroke-dasharray="4 3" />
        <polygon points="50,46 56,50 50,54" :fill="primaryFill" />
      </template>

      <!-- left arrow -->
      <template v-else-if="type === 'left'">
        <line x1="0" y1="50%" x2="56" y2="50%"
              :stroke="primaryStroke" stroke-width="1" stroke-dasharray="4 3" />
        <polygon points="6,46 0,50 6,54" :fill="primaryFill" />
      </template>

      <!-- bidirectional: top → right, bottom → left -->
      <template v-else-if="type === 'bidirectional'">
        <line x1="0" y1="38%" x2="56" y2="38%"
              :stroke="primaryStroke" stroke-width="1" stroke-dasharray="4 3" />
        <polygon points="50,34 56,38 50,42" :fill="primaryFill" />
        <line x1="56" y1="62%" x2="0" y2="62%"
              :stroke="secondaryStroke" stroke-width="1" stroke-dasharray="4 3" />
        <polygon points="6,58 0,62 6,66" :fill="secondaryFill" />
      </template>
    </svg>

    <!-- labels -->
    <div
      class="relative z-10 h-full flex flex-col items-center justify-center gap-[0.2rem]"
    >
      <span
        v-for="lbl in labels"
        :key="lbl.text"
        class="px-[0.35rem] py-[0.13rem] border text-[0.5rem] tracking-[0.08em] uppercase whitespace-nowrap bg-[#0a0c10]"
        style="font-family:'IBM Plex Mono',monospace"
        :style="{ color: lbl.color, borderColor: lbl.borderColor }"
      >
        {{ lbl.text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WireLabel } from './types'

defineProps<{
  type: 'right' | 'left' | 'bidirectional'
  primaryStroke: string
  primaryFill: string
  secondaryStroke?: string
  secondaryFill?: string
  labels: WireLabel[]
}>()
</script>
