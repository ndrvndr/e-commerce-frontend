<template>
  <div
    class="text-[0.78rem] px-4 py-3 border-l-2 font-sans font-normal leading-[1.4]"
    :class="classes"
  >
    <span class="text-paper/75">{{ title }}</span>
    <span
      class="block font-mono text-[0.6rem] tracking-[0.1em] opacity-50 mt-0.5"
      >{{ sub }}</span
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  sub: string;
  color: 'sage' | 'rust' | 'gold';
}>();

const classes = computed(() => ({
  'border-sage bg-sage/8': props.color === 'sage',
  'border-rust bg-rust/8': props.color === 'rust',
  'border-gold bg-gold/8': props.color === 'gold',
}));
</script>
