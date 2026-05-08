<script setup>
definePageMeta({
  middleware: 'guest',
  layout: false,
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

onMounted(() => {
  const token = route.query.token;

  if (token) {
    const tokenCookie = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 });
    tokenCookie.value = token;

    toast.add({
      title: 'Welcome back!',
      description: 'You have been logged in successfully.',
      icon: 'i-heroicons-check-circle',
      color: 'success',
    });

    router.push('/profile');
  } else {
    router.push('/authentication/login?error=Failed to authenticate');
  }
});
</script>

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
