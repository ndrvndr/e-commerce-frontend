<template>
  <div>
    <section class="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <UContainer>
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Welcome to the Store
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Discover our amazing collection of high-quality products. We offer the best apparel and electronics for your everyday needs.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <UButton to="/catalogs/apparel" size="lg" color="primary">Shop Apparel</UButton>
            <UButton to="/catalogs/electronics" size="lg" color="gray" variant="ghost">View Electronics <span aria-hidden="true">→</span></UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
