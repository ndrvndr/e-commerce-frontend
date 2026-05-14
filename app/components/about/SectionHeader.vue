<template>
  <div class="mb-10 flex items-baseline gap-6">
    <span class="font-mono text-[0.65rem] tracking-[0.1em] shrink-0"
      >{{ num }} —</span
    >
    <h2
      class="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.01em]"
    >
      {{ title }} <em class="italic text-error-500">{{ emphasis }}</em>
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  num: string;
  title: string;
  emphasis: string;
}>();
</script>
