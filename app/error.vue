<template>
  <UError
    :error="{
      statusCode: error.status,
      statusMessage: error.statusText,
      message: error.message,
    }"
  />
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

useHead({
  title: `${props.error.status} ${props.error.statusText}`,
});
</script>
