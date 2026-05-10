<template>
  <UMain>
    <UContainer
      class="space-y-5 max-w-xl mx-auto pt-32 pb-4 md:pt-36 md:pb-6 lg:pb-8"
    >
      <h1 class="text-center text-lg font-bold">Message Me</h1>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex flex-col md:flex-row gap-4">
          <UFormField name="name" class="flex-1">
            <UInput
              v-model="state.name"
              size="xl"
              placeholder="Name"
              class="w-full"
            />
          </UFormField>

          <UFormField name="email" class="flex-1">
            <UInput
              v-model="state.email"
              size="xl"
              placeholder="Email"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField name="phone_number">
          <UInput
            v-model="state.phone_number"
            type="tel"
            size="xl"
            placeholder="Phone number"
            class="w-full"
          />
        </UFormField>

        <UFormField name="subject">
          <UInput
            v-model="state.subject"
            size="xl"
            placeholder="Subject"
            class="w-full"
          />
        </UFormField>

        <UFormField name="message">
          <UTextarea
            v-model="state.message"
            placeholder="Message"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <UButton
          type="submit"
          size="xl"
          color="neutral"
          variant="solid"
          :loading="isSending"
        >
          Send
        </UButton>
      </UForm>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
useHead({
  title: 'Message Me',
});

import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

const schema = z.object({
  name: z.string('Name is required').min(1, 'Name is required'),
  email: z.string('Email is required').email('Invalid email'),
  phone_number: z
    .string('Phone number is required')
    .min(1, 'Phone number is required'),
  subject: z.string('Subject is required').min(1, 'Subject is required'),
  message: z.string('Message is required').min(1, 'Message is required'),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: '',
  email: '',
  phone_number: '',
  subject: '',
  message: '',
});

const toast = useToast();
const isSending = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSending.value = true;

  try {
    await $fetch('/api/send-email', {
      method: 'post',
      body: event.data,
    });

    toast.add({
      title: 'Success',
      description: 'Message sent successfully',
      color: 'success',
    });

    state.name = '';
    state.email = '';
    state.phone_number = '';
    state.subject = '';
    state.message = '';
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to send message.',
      color: 'error',
    });
  } finally {
    isSending.value = false;
  }
}
</script>
