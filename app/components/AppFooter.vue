<template>
  <UFooter class="bg-gray-50">
    <template #left>
      <p class="text-sm">
        &copy; {{ new Date().getFullYear() }} Developed by Ndre
      </p>
    </template>

    <div class="max-w-lg flex flex-col items-center gap-y-3">
      <p class="text-center text-sm">
        This portfolio is a decoupled application using
        <ULink
          :to="`${useRuntimeConfig().public.apiBase}`"
          target="_blank"
          aria-label="Headless API"
          class="underline underline-offset-2"
          >Laravel 13</ULink
        >
        as a headless API and Nuxt 3 for the frontend.
      </p>

      <div class="flex items-center gap-2">
        <UBadge color="neutral" variant="solid" size="md">Vercel</UBadge>
        <UBadge color="neutral" variant="solid" size="md">Railway</UBadge>
        <UBadge color="neutral" variant="solid" size="md">Neon</UBadge>
      </div>
    </div>

    <template #right>
      <UButton
        icon="mdi:linkedin"
        color="neutral"
        variant="ghost"
        to="https://www.linkedin.com/in/ndrvndr/"
        target="_blank"
        aria-label="Discord"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/ndrvndr/"
        target="_blank"
        aria-label="X"
      />
      <UButton
        icon="mdi:world"
        color="neutral"
        variant="ghost"
        to="https://andreavindra.vercel.app/"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>
