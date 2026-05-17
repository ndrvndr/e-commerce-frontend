<template>
  <UMain class="min-h-screen flex items-center justify-center">
    <UContainer>
      <UCard class="mx-auto max-w-md ring-0 md:ring-1">
        <div class="mt-5 flex flex-col items-center gap-y-4">
          <h1 class="text-center text-xl font-semibold">
            Setting up your account
          </h1>
          <UIcon name="mingcute:loading-fill" class="animate-spin size-8" />
        </div>
      </UCard>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  layout: false,
});

const route = useRoute();
const router = useRouter();
const toast = useToast();
const { clearUser } = useAuth();

onMounted(async () => {
  const code = route.query.code;

  if (!code) {
    return router.push('/authentication/login?error=Failed to authenticate');
  }

  try {
    await $fetch(`${useRuntimeConfig().public.apiBase}/api/auth/verify-code`, {
      method: 'POST',
      body: { code },
      credentials: 'include',
    });

    toast.add({
      title: 'Welcome back!',
      description: 'You have been logged in successfully.',
      icon: 'i-heroicons-check-circle',
      color: 'success',
    });

    clearUser();
    router.push('/profile');
  } catch (e) {
    router.push('/authentication/login?error=Failed to authenticate');
  }
});
</script>
