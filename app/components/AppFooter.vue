<template>
  <footer class="bg-gray-50">
    <UContainer class="py-12 md:py-16 max-w-[1800px]">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="space-y-4">
          <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl">
            <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6" />
            Store
          </NuxtLink>

          <p class="text-sm">
            Making the world a better place through constructing elegant
            hierarchies.
          </p>

          <div class="flex items-center gap-1">
            <NuxtLink
              to="https://www.linkedin.com/in/ndrvndr/"
              target="_blank"
              external
            >
              <UButton
                color="neutral"
                variant="ghost"
                icon="mdi:linkedin"
                aria-label="LinkedIn"
                size="lg"
              />
            </NuxtLink>
            <NuxtLink to="https://github.com/ndrvndr/" target="_blank" external>
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-simple-icons-github"
                aria-label="GitHub"
                size="lg"
              />
            </NuxtLink>
            <NuxtLink
              to="https://andreavindra.vercel.app/"
              target="_blank"
              external
            >
              <UButton
                color="neutral"
                variant="ghost"
                icon="mdi:world"
                aria-label="Andre Avindra"
                size="lg"
              />
            </NuxtLink>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Customer Care
          </h3>
          <ul class="space-y-3">
            <AppFooterLink to="#">Contact</AppFooterLink>
            <AppFooterLink to="#">Refund/Return Policy</AppFooterLink>
            <AppFooterLink to="#">Privacy Policy</AppFooterLink>
            <AppFooterLink to="#">Shipping Policy</AppFooterLink>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Company
          </h3>
          <ul class="space-y-3">
            <AppFooterLink to="#">About Us</AppFooterLink>
            <AppFooterLink to="/">Our Store</AppFooterLink>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Subscribe to our newsletter
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form class="flex gap-2" @submit.prevent>
            <UInput
              type="email"
              placeholder="Enter your email"
              class="flex-1"
            />
            <UButton type="submit" color="neutral">Subscribe</UButton>
          </form>
        </div>
      </div>
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p class="text-sm text-gray-400 text-center">
          &copy; {{ new Date().getFullYear() }} Store, Inc. All rights reserved.
        </p>
      </div>
    </UContainer>
  </footer>
</template>
