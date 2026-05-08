<template>
  <UForm
    :schema="AddressSchema"
    :state="state"
    class="grid grid-cols-2 gap-4"
    @submit="onSubmit"
  >
    <UFormField name="country" class="col-span-2">
      <USelectMenu
        v-model="state.country"
        :items="countries"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField name="first_name" class="col-span-2 md:col-span-1">
      <UInput
        v-model="state.first_name"
        placeholder="First name"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField name="last_name" class="col-span-2 md:col-span-1">
      <UInput
        v-model="state.last_name"
        placeholder="Last name"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField name="address" class="col-span-2">
      <UInput
        v-model="state.address"
        placeholder="Address"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField name="note" class="col-span-2">
      <UInput
        v-model="state.note"
        placeholder="Apartment, suite, etc (optional)"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField name="city" class="col-span-2">
      <UInput
        v-model="state.city"
        placeholder="City"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField name="province" class="col-span-2 md:col-span-1">
      <USelectMenu
        v-model="state.province"
        :items="provinces"
        class="w-full"
        size="xl"
      />
    </UFormField>

    <UFormField name="postal_code" class="col-span-2 md:col-span-1">
      <UInput
        type="number"
        v-model="state.postal_code"
        placeholder="Postal code"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField name="phone_number" class="col-span-2">
      <UInput
        type="tel"
        v-model="state.phone_number"
        placeholder="Phone number"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField name="is_default" class="col-span-2">
      <UCheckbox
        v-model="state.is_default"
        name="is_default"
        label="This is my default address"
      />
    </UFormField>

    <div class="col-span-2 flex justify-end gap-x-4">
      <UButton
        v-if="id && !state.is_default"
        type="button"
        label="Delete"
        color="error"
        variant="solid"
        size="xl"
        class="w-fit"
        :disabled="isSubmitting"
        :loading="isDeleting"
        @click="onDelete"
      />
      <UButton
        type="submit"
        :label="id ? 'Update' : 'Save'"
        color="neutral"
        variant="solid"
        size="xl"
        class="w-fit"
        :disabled="isDeleting"
        :loading="isSubmitting"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { COUNTRIES, PROVINCES } from '~/constant';
import {
  AddressSchema,
  type Address,
  type AddressWithId,
} from '~/types/address';

const props = defineProps<{
  id?: number;
  address?: Address;
  refresh: () => void;
}>();
const emit = defineEmits<{ success: [] }>();
const { address, id, refresh } = toRefs(props);

const countries = ref(COUNTRIES);
const provinces = ref(PROVINCES);

const state = reactive<Partial<Address>>({
  country: address.value?.country || 'Indonesia',
  first_name: address.value?.first_name || '',
  last_name: address.value?.last_name || '',
  address: address.value?.address || '',
  note: address.value?.note || '',
  city: address.value?.city || '',
  province: address.value?.province || 'West Java',
  postal_code: address.value?.postal_code || undefined,
  phone_number: address.value?.phone_number || '',
  is_default: address.value?.is_default ?? false,
});

const toast = useToast();

const isSubmitting = ref(false);
const isDeleting = ref(false);

async function onSubmit(event: FormSubmitEvent<Address>) {
  isSubmitting.value = true;

  try {
    await useApi<AddressWithId>(
      id.value ? `/api/addresses/${id.value}` : '/api/addresses',
      {
        method: id.value ? 'PUT' : 'POST',
        body: event.data,
      },
    );

    refresh.value();
    emit('success');

    toast.add({
      title: 'Success',
      description: id.value
        ? 'Address has been updated successfully'
        : 'Address has been saved successfully',
      color: 'success',
    });
  } catch (err: unknown) {
    toast.add({
      title: 'Failed',
      description: 'An error occurred while sending data',
      color: 'error',
    });

    console.error('Submit error:', err);
  } finally {
    isSubmitting.value = false;
  }
}

async function onDelete() {
  isDeleting.value = true;

  try {
    await useApi<AddressWithId>(`/api/addresses/${id.value}`, {
      method: 'DELETE',
    });

    refresh.value();
    emit('success');

    toast.add({
      title: 'Success',
      description: 'Address has been deleted successfully',
      color: 'success',
    });
  } catch (err: unknown) {
    toast.add({
      title: 'Failed',
      description: 'An error occurred while deleting address',
      color: 'error',
    });

    console.error('Delete error:', err);
  } finally {
    isDeleting.value = false;
  }
}
</script>
