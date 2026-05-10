<template>
  <UFooter class="bg-gray-50">
    <template #left>
      <p class="text-sm">
        &copy; {{ new Date().getFullYear() }} Developed by Ndre
      </p>
    </template>

    <div class="text-center">
      <p class="text-xs text-gray-500 mb-3">Powered by a modern stack</p>
      <div class="flex flex-wrap items-center justify-center gap-2">
        <UBadge variant="subtle" color="primary" size="sm" class="font-mono">
          Nuxt.js
        </UBadge>
        <ULink
          :to="`${useRuntimeConfig().public.apiBase}`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center"
        >
          <UBadge variant="subtle" color="error" size="sm" class="font-mono">
            Laravel 13
          </UBadge>
        </ULink>
        <USeparator orientation="vertical" class="h-5" />
        <UBadge variant="outline" color="neutral" size="sm" class="opacity-70">
          Vercel
        </UBadge>
        <UBadge variant="outline" color="neutral" size="sm" class="opacity-70">
          Render
        </UBadge>
        <UBadge variant="outline" color="neutral" size="sm" class="opacity-70">
          Neon DB
        </UBadge>
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
