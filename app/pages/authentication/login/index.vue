<template>
    <UMain class="grid place-items-center">
        <UContainer class="max-w-7xl mx-auto py-4 md:py-6 lg:py-8">
            <UCard class="mx-auto max-w-md ring-0 md:ring-1">
                <h1 class="text-center text-3xl font-semibold">Store</h1>

                <div class="mt-5 space-y-2.5">
                    <h2 class="text-xl font-semibold">Sign in</h2>
                    <p class="text-sm">Sign in or create an account</p>
                </div>

                <div class="mt-5">
                    <UButton
                        color="neutral"
                        variant="outline"
                        size="xl"
                        icon="i-devicon-google"
                        class="w-full flex items-center justify-center"
                        :to="`${useRuntimeConfig().public.apiBase}/auth/google/redirect`"
                    >
                        Continue with Google
                    </UButton>
                </div>
            </UCard>
        </UContainer>
    </UMain>
</template>

<script setup>
definePageMeta({
    middleware: "guest",
});

useHead({
    title: "Sign in",
});

const route = useRoute();
const toast = useToast();

onMounted(() => {
    const errorKey = route.query.error;

    if (errorKey) {
        toast.add({
            title: "Failed to login",
            description: errorKey,
            icon: "i-heroicons-exclamation-circle",
            color: "error",
        });

        window.history.replaceState({}, document.title, route.path);
    }
});
</script>
