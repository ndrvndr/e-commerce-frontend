<template>
  <UMain>
    <UContainer
      class="flex flex-col min-h-[calc(100vh-var(--ui-header-height))] max-w-7xl mx-auto py-4 md:pt-36 md:py-6 lg:py-8"
    >
      <div class="flex justify-between items-center font-mono">
        <p class="text-[0.7rem] tracking-[0.15em]">PORTFOLIO / 2026</p>
        <div class="flex gap-2 items-center">
          <UBadge
            label="NUXT.JS"
            variant="outline"
            color="primary"
            class="text-[0.65rem] tracking-[0.1em]"
          />
          <UBadge
            label="LARAVEL"
            variant="outline"
            color="error"
            class="text-[0.65rem] tracking-[0.1em]"
          />
        </div>
      </div>

      <section
        class="min-h-[calc(100vh-103px)] lg:min-h-[calc(100vh-119px)] flex-1 flex flex-col justify-center gap-y-10"
      >
        <div class="flex items-center gap-x-3">
          <USeparator class="w-10" />
          <p class="font-mono text-[0.7rem] tracking-[0.2em]">
            FULL-STACK E-COMMERCE
          </p>
        </div>

        <h1 class="text-[clamp(3.5rem,9vw,8rem)] leading-[0.95]">
          Modern<br />
          <em class="italic text-error-500">Commerce</em><br />
          Platform
        </h1>

        <p class="max-w-lg">
          Decoupled architecture between Nuxt.js as a customer-facing storefront
          and Laravel as an API backend — designed for scalability, security,
          and an efficient content management experience.
        </p>

        <USeparator class="max-w-3xl" />

        <div class="flex flex-wrap gap-8">
          <div v-for="meta in heroMeta" :key="meta.label" class="space-y-1">
            <p class="font-mono text-xs">
              {{ meta.label }}
            </p>
            <p class="text-sm font-semibold">
              {{ meta.value }}
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader num="01" title="System" emphasis="Architecture" />
        <ArchitectureDiagram />
      </section>

      <USeparator class="my-20" />

      <section>
        <SectionHeader num="02" title="Nuxt.js Pages &" emphasis="Features" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            v-for="card in nuxtCards"
            :key="card.title"
            v-bind="card"
            color="nuxt"
          />
        </div>
      </section>

      <USeparator class="my-20" />

      <section>
        <SectionHeader num="03" title="OAuth Google" emphasis="Flow" />

        <div
          class="px-6 md:px-10 py-8 border-l-4 mb-10 bg-neutral-100 hover:scale-105 transition-all duration-300"
        >
          <div class="font-mono text-[0.6rem] tracking-[0.15em] uppercase mb-3">
            DESIGN DECISION
          </div>
          <p class="font-display text-lg font-light leading-[1.7] italic">
            Laravel acts as an OAuth broker — verifying Google identity via
            Socialite and returning an internal token to Nuxt, so Nuxt doesn't
            need to store Google credentials.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div
            v-for="(step, i) in authSteps"
            :key="step.label"
            class="text-center relative px-3 py-6"
          >
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl border border-neutral-400"
            >
              {{ step.icon }}
            </div>
            <div class="text-xs font-bold mb-1">{{ step.label }}</div>
            <div class="text-[10px]">
              {{ step.sub }}
            </div>
            <span
              v-if="i < authSteps.length - 1"
              class="hidden md:block absolute right-[-0.5rem] top-1/2 -translate-y-1/2 z-10"
              >→</span
            >
          </div>
        </div>
      </section>

      <USeparator class="my-20" />

      <section>
        <SectionHeader
          num="04"
          title="Laravel Backend &"
          emphasis="Filament CMS"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            v-for="card in laravelCards"
            :key="card.title"
            v-bind="card"
            color="nuxt"
          />
        </div>
      </section>

      <USeparator class="my-20" />

      <section>
        <SectionHeader num="05" title="Tech Stack" emphasis="Summary" />

        <UTable ref="table" :data="data" :columns="columns" />
      </section>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
import FeatureCard from '~/components/about/FeatureCard.vue';
import SectionHeader from '~/components/about/SectionHeader.vue';
import ArchitectureDiagram from '~/components/about/ArchitectureDiagram.vue';
import type { TableColumn } from '@nuxt/ui';

useHead({
  title: 'Project Info',
});

const heroMeta = [
  { label: 'FRONTEND', value: 'Nuxt.js 3' },
  { label: 'BACKEND', value: 'Laravel + Filament' },
  { label: 'DATABASE', value: 'Neon Postgres' },
  { label: 'STORAGE', value: 'Cloudflare R2' },
];

const nuxtCards = [
  {
    icon: '🗂',
    title: 'Catalog Listing',
    desc: 'Displays all available catalogs. Each catalog shows a list of products linked through relationships in Laravel.',
    tags: ['SSR', 'Public API', 'Dynamic Route'],
  },
  {
    icon: '📦',
    title: 'Product Detail',
    desc: 'Product detail page accessed via slug. Data is fetched from the Laravel public endpoint /api/products/{slug}.',
    tags: ['Slug-based', 'No Auth', 'SEO Meta'],
  },
  {
    icon: '🖼',
    title: 'Gallery',
    desc: 'Showcase of product photos used by customers. Managed through Filament and retrieved via the public gallery API.',
    tags: ['Cloudflare R2', 'Public API'],
  },
  {
    icon: '✉️',
    title: 'Message Me',
    desc: 'Contact form with name, email, subject, and message fields. Emails are sent directly from the Nuxt server route using Resend — without going through Laravel.',
    tags: ['Resend API', 'Server Route', 'send-email.post.ts'],
  },
  {
    icon: '👤',
    title: 'Profile & Address',
    desc: 'The profile page is only accessible after login. Users can perform CRUD operations on shipping addresses. Every request uses a Bearer token from Google OAuth.',
    tags: ['Protected Route', 'Bearer Token', 'CRUD'],
  },
  {
    icon: '🛒',
    title: 'Cart & Checkout',
    desc: 'The slideover cart is managed entirely on the client-side using Pinia store and localStorage. No database persistence — lightweight and fast.',
    tags: ['Pinia', 'localStorage', 'Client-only'],
  },
];

const authSteps = [
  {
    icon: '👤',
    label: 'User',
    sub: 'Click "Login with Google" in Nuxt',
    active: false,
  },
  {
    icon: '🔗',
    label: 'Google OAuth',
    sub: 'Redirect to Google consent screen',
    active: true,
  },
  {
    icon: '⚙️',
    label: 'Laravel Socialite',
    sub: 'Verify callback, check / create user',
    active: true,
  },
  {
    icon: '🔑',
    label: 'Token Issued',
    sub: 'Laravel returns Bearer token to Nuxt',
    active: true,
  },
  {
    icon: '🔓',
    label: 'Profile Unlocked',
    sub: 'Nuxt stores token, accesses profile page',
    active: false,
  },
];

const laravelCards = [
  {
    icon: '🔌',
    title: 'Public RESTful API',
    desc: 'Public endpoints without authentication for storefront needs. Catalog by slug returns product relations all at once. Designed for Nuxt SSR.',
    tags: [
      'GET /catalogs',
      'GET /catalogs/{slug}',
      'GET /products/{slug}',
      'GET /gallery',
    ],
    color: 'laravel',
  },
  {
    icon: '🏛',
    title: 'Filament Admin Panel',
    desc: 'Content management dashboard for superadmins and staff. Full CRUD for catalogs, products, and gallery. Direct image uploads to Cloudflare R2.',
    tags: ['Filament v3', 'Cloudflare R2', 'Neon Postgres'],
    color: 'laravel',
  },
  {
    icon: '🛡',
    title: 'RBAC — Role & Permission',
    desc: 'User and role management for internal staff. Filament Shield as a UI wrapper on top of Spatie Laravel Permission.',
    tags: ['Filament Shield', 'Spatie Permission', 'Role-based'],
    color: 'laravel',
  },
  {
    icon: '🗄',
    title: 'Neon Postgres',
    desc: 'Serverless cloud PostgreSQL for production. Stores only upload URLs — no binary images in the database. Schema managed via Laravel migrations.',
    tags: ['Serverless', 'PostgreSQL', 'URL-only Storage'],
    color: 'shared',
  },
  {
    icon: '☁️',
    title: 'Cloudflare R2 Object Storage',
    desc: 'All images (catalogs, products, gallery) are stored in R2. Uses S3-compatible API from Laravel. Free CDN edge delivery with no egress fees.',
    tags: ['S3-compatible', 'Zero Egress', 'CDN Edge'],
    color: 'shared',
  },
  {
    icon: '🔐',
    title: 'Google OAuth via Socialite',
    desc: 'Laravel acts as an OAuth broker for customer authentication. Socialite handles the Google callback, verifies identity, and issues an internal Bearer token returned to Nuxt.',
    tags: ['Laravel Socialite', 'OAuth 2.0'],
    color: 'laravel',
  },
];

const UBadge = resolveComponent('UBadge');

type TechStack = {
  technology: string;
  layer: string;
  role: string;
};

const data = ref<TechStack[]>([
  {
    technology: 'Nuxt.js',
    layer: 'frontend',
    role: 'Storefront SSR, routing, server API routes, state management',
  },
  {
    technology: 'Pinia',
    layer: 'frontend',
    role: 'Global state for cart — persisted in localStorage',
  },
  {
    technology: 'Laravel',
    layer: 'backend',
    role: 'REST API, Google OAuth via Socialite, business logic',
  },
  {
    technology: 'Filament v3',
    layer: 'backend',
    role: 'Admin panel CMS — CRUD for catalogs, products, gallery',
  },
  {
    technology: 'Filament Shield + Spatie',
    layer: 'backend',
    role: 'RBAC — granular role & permission management for staff',
  },
  {
    technology: 'Neon Postgres',
    layer: 'infra',
    role: 'Serverless PostgreSQL — data, relationships, image URLs',
  },
  {
    technology: 'Cloudflare R2',
    layer: 'infra',
    role: 'Image object storage — S3-compatible, zero egress fee',
  },
  {
    technology: 'Resend',
    layer: 'infra',
    role: 'Email delivery from contact form via Nuxt server route',
  },
  {
    technology: 'Google OAuth / Socialite',
    layer: 'auth',
    role: 'Customer login — handshake via Laravel, token returned to Nuxt',
  },
]);

const columns: TableColumn<TechStack>[] = [
  {
    accessorKey: 'technology',
    header: 'TECHNOLOGY',
    cell: ({ row }) => row.getValue('technology'),
  },
  {
    accessorKey: 'layer',
    header: 'LAYER',
    cell: ({ row }) => {
      const color = {
        frontend: 'success' as const,
        backend: 'error' as const,
        infra: 'warning' as const,
        auth: 'info' as const,
      }[row.getValue('layer') as string];

      return h(UBadge, { class: 'uppercase', variant: 'soft', color }, () =>
        row.getValue('layer'),
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Peran dalam Sistem',
    cell: ({ row }) => row.getValue('role'),
  },
];

const table = useTemplateRef('table');
</script>
