<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950 font-sans">
    <AppNavbar />
    <main class="flex-1 w-full flex flex-col">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
