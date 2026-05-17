<template>
  <section class="space-y-3.5">
    <div class="flex justify-between items-end">
      <h2 class="text-xl font-semibold">Contact</h2>
      <NuxtLink
        v-if="!currentUser"
        to="/authentication/login"
        class="text-sm text-neutral-400"
      >
        Sign in
      </NuxtLink>
    </div>

    <div v-if="isLoading" class="flex items-center gap-x-2">
      <USkeleton class="size-8 rounded-full shrink-0" />
      <USkeleton class="h-4 w-48" />
    </div>

    <template v-else>
      <div
        v-if="currentUser"
        class="flex items-center justify-between gap-x-2.5"
      >
        <div class="flex items-center gap-x-2">
          <UAvatar :alt="currentUser.name" size="md" />
          <p class="text-sm">{{ currentUser.email }}</p>
        </div>

        <UPopover>
          <UButton
            type="button"
            icon="mage:dots"
            color="neutral"
            variant="ghost"
            size="sm"
          />
          <template #content>
            <UButton
              label="Sign out"
              variant="ghost"
              color="neutral"
              :loading="isLoggingOut"
              @click="emit('logout')"
            />
          </template>
        </UPopover>
      </div>

      <UFormField v-else name="email">
        <UInput
          :model-value="email"
          size="xl"
          placeholder="Email"
          class="w-full"
          @update:model-value="emit('update:email', $event)"
        />
      </UFormField>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { User } from '~/types/me';

const props = defineProps<{
  currentUser: User | null;
  email: string;
  isLoggingOut: boolean;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  logout: [];
  'update:email': [value: string];
}>();
</script>
