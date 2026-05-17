<template>
  <UError
    v-if="status === 'error'"
    :clear="{
      color: 'neutral',
      variant: 'solid',
    }"
    :error="{
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Something went wrong',
    }"
  />

  <UMain v-else>
    <UContainer class="max-w-7xl mx-auto py-4 md:py-6 lg:py-8">
      <h1 class="text-xl font-semibold">Profile</h1>

      <div class="mt-6">
        <UCard class="text-sm">
          <p class="font-semibold">{{ user?.name }}</p>
          <p class="mt-4 text-neutral-400">Email</p>
          <p class="mt-0.5">{{ user?.email }}</p>
        </UCard>

        <UCard class="mt-6 text-sm">
          <div
            class="flex items-center justify-between gap-x-6 md:justify-start"
          >
            <p class="font-semibold">Addresses</p>

            <USlideover title="Add Address" v-model:open="addOpen">
              <UButton
                label="Add"
                size="xs"
                color="neutral"
                variant="ghost"
                icon="material-symbols:add-rounded"
              />

              <template #body>
                <AddressForm :refresh="refresh" @success="addOpen = false" />
              </template>
            </USlideover>
          </div>

          <div
            v-if="status === 'idle' || pending"
            class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            <div v-for="i in 4" :key="i" class="space-y-2">
              <USkeleton class="h-4 w-3/4" />
              <USkeleton class="h-3 w-full" />
              <USkeleton class="h-3 w-2/3" />
              <USkeleton class="h-3 w-1/2" />
            </div>
          </div>

          <div
            v-else-if="Array.isArray(addresses) && addresses.length > 0"
            class="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            <div
              v-for="address in addresses"
              :key="address.id"
              class="relative text-sm"
            >
              <div
                class="flex items-center justify-between gap-x-6 md:justify-start"
              >
                <p v-if="address.is_default" class="text-neutral-400">
                  Default address
                </p>

                <USlideover
                  title="Edit Address"
                  v-model:open="editOpen[address.id]"
                >
                  <UButton
                    size="xs"
                    color="neutral"
                    variant="ghost"
                    icon="tabler:pencil"
                    class="absolute top-0 right-1"
                  />

                  <template #body>
                    <AddressForm
                      :id="address.id"
                      :address="{
                        country: address.country,
                        first_name: address.first_name,
                        last_name: address.last_name,
                        address: address.address,
                        note: address.note,
                        city: address.city,
                        province: address.province,
                        postal_code: address.postal_code,
                        phone_number: address.phone_number,
                        is_default: address.is_default,
                      }"
                      :refresh="refresh"
                      @success="editOpen[address.id] = false"
                    />
                  </template>
                </USlideover>
              </div>

              <div class="mt-2.5 space-y-0.5">
                <p>
                  {{ address.first_name }}
                  {{ address.last_name }}
                </p>
                <p>{{ address.address }}</p>
                <p>{{ address.city }}</p>
                <p>
                  {{ address.province }},
                  {{ address.postal_code }}
                </p>
                <p>{{ address.country }}</p>
                <p>{{ address.phone_number }}</p>
              </div>
            </div>
          </div>

          <UEmpty
            v-else
            variant="naked"
            title="No addresses found"
            description="There are currently no addresses available to display."
            class="flex-1"
          />
        </UCard>
      </div>

      <UButton
        label="Sign out"
        color="neutral"
        variant="outline"
        size="xl"
        class="mt-6"
        :loading="isLoggingOut"
        @click="handleLogout"
      />
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
import type { AddressWithId } from '~/types/address';

definePageMeta({
  middleware: 'auth',
});

useHead({
  title: 'Profile',
});

const { data, status, error, refresh, pending } = await useApi<AddressWithId[]>(
  '/api/addresses',
  {
    key: 'user-addresses',
    server: false,
  },
);
const addresses = computed(() => data.value?.data || []);

const addOpen = ref(false);
const editOpen = reactive<Record<number, boolean>>({});

const { logout, user } = useAuth();
const toast = useToast();
const isLoggingOut = ref(false);

const handleLogout = async () => {
  isLoggingOut.value = true;
  try {
    await logout();
    toast.add({
      title: 'Success',
      description: 'You have been logged out successfully',
      color: 'success',
    });
  } catch (error) {
    console.error('Failed to logout:', error);
  } finally {
    isLoggingOut.value = false;
  }
};
</script>
