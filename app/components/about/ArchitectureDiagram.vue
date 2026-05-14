<template>
  <!-- outer shell: dark canvas + horizontal scroll on small screens -->
  <div
    class="rounded-xl overflow-x-auto p-7 pb-8 text-[#dde1ea]"
    style="background: #0a0c10; font-family: 'IBM Plex Sans', sans-serif"
  >
    <!-- ══════════════════════════════════════
         TOP ROW
         Customer → Nuxt ↔ Laravel ↔ Filament ← Admin
         ══════════════════════════════════════ -->
    <div
      class="grid items-stretch"
      style="
        grid-template-columns: 80px 56px 210px 56px 210px 56px 210px 56px 80px;
        min-width: 920px;
      "
    >
      <ArchActor icon="👤" label="Customer" />

      <ArchHWire
        type="right"
        primary-stroke="rgba(65,184,131,0.35)"
        primary-fill="rgba(65,184,131,0.35)"
        :labels="[
          {
            text: 'HTTPS',
            color: '#41b883',
            borderColor: 'rgba(65,184,131,0.3)',
          },
        ]"
      />

      <ArchLayer name="Nuxt.js 3 — Storefront" color="nuxt">
        <ArchNode
          v-for="node in nuxtNodes"
          :key="node.label"
          :icon="node.icon"
          :label="node.label"
          :sub="node.sub"
          layer-color="nuxt"
        >
          <ArchBadge v-for="b in node.badges" :key="b.label" :color="b.color">
            {{ b.label }}
          </ArchBadge>
        </ArchNode>
      </ArchLayer>

      <ArchHWire
        type="bidirectional"
        primary-stroke="rgba(65,184,131,0.35)"
        primary-fill="rgba(65,184,131,0.35)"
        secondary-stroke="rgba(255,45,32,0.35)"
        secondary-fill="rgba(255,45,32,0.35)"
        :labels="[
          {
            text: '→ API',
            color: '#41b883',
            borderColor: 'rgba(65,184,131,0.3)',
          },
          {
            text: '← Token',
            color: '#ff2d20',
            borderColor: 'rgba(255,45,32,0.3)',
          },
        ]"
      />

      <ArchLayer name="Laravel — API Backend" color="laravel">
        <ArchNode
          v-for="node in laravelNodes"
          :key="node.label"
          :icon="node.icon"
          :label="node.label"
          :sub="node.sub"
          layer-color="laravel"
        >
          <ArchBadge v-for="b in node.badges" :key="b.label" :color="b.color">
            {{ b.label }}
          </ArchBadge>
        </ArchNode>
      </ArchLayer>

      <ArchHWire
        type="left"
        primary-stroke="rgba(245,158,11,0.35)"
        primary-fill="rgba(245,158,11,0.55)"
        :labels="[
          {
            text: 'Eloquent',
            color: '#f59e0b',
            borderColor: 'rgba(245,158,11,0.3)',
          },
        ]"
      />

      <ArchLayer name="Filament v3 — Admin CMS" color="filament">
        <ArchNode
          v-for="node in filamentNodes"
          :key="node.label"
          :icon="node.icon"
          :label="node.label"
          :sub="node.sub"
          layer-color="filament"
        >
          <ArchBadge v-for="b in node.badges" :key="b.label" :color="b.color">
            {{ b.label }}
          </ArchBadge>
        </ArchNode>
      </ArchLayer>

      <ArchHWire
        type="left"
        primary-stroke="rgba(245,158,11,0.35)"
        primary-fill="rgba(245,158,11,0.55)"
        :labels="[
          {
            text: 'HTTPS',
            color: '#f59e0b',
            borderColor: 'rgba(245,158,11,0.3)',
          },
        ]"
      />

      <ArchActor icon="🧑‍💼" label="Admin / Staff" />
    </div>

    <!-- ══════════════════════════════════════
         VERTICAL WIRE ROW  (top → infra)
         ══════════════════════════════════════ -->
    <div
      class="grid h-12"
      style="
        grid-template-columns: 80px 56px 210px 56px 210px 56px 210px 56px 80px;
        min-width: 920px;
      "
    >
      <div />
      <div />
      <!-- Nuxt → Resend -->
      <ArchVWire
        stroke-color="rgba(167,139,250,0.45)"
        arrow-color="rgba(167,139,250,0.65)"
      />
      <div />
      <!-- Laravel → Neon / R2 / OAuth -->
      <ArchVWire
        stroke-color="rgba(96,165,250,0.45)"
        arrow-color="rgba(96,165,250,0.65)"
      />
      <div />
      <div />
      <div />
      <div />
    </div>

    <!-- ══════════════════════════════════════
         BOTTOM ROW — INFRA
         ══════════════════════════════════════ -->
    <div
      class="grid items-start"
      style="
        grid-template-columns: 80px 56px 210px 56px 210px 56px 210px 56px 80px;
        min-width: 920px;
      "
    >
      <div />
      <div />

      <ArchLayer name="Infra — Nuxt" color="infra-nuxt">
        <ArchNode
          v-for="node in infraNuxtNodes"
          :key="node.label"
          :icon="node.icon"
          :label="node.label"
          :sub="node.sub"
          layer-color="infra-nuxt"
        >
          <ArchBadge v-for="b in node.badges" :key="b.label" :color="b.color">
            {{ b.label }}
          </ArchBadge>
        </ArchNode>
      </ArchLayer>

      <div />

      <ArchLayer name="Infra — Laravel" color="infra-laravel">
        <ArchNode
          v-for="node in infraLaravelNodes"
          :key="node.label"
          :icon="node.icon"
          :label="node.label"
          :sub="node.sub"
          layer-color="infra-laravel"
        >
          <ArchBadge v-for="b in node.badges" :key="b.label" :color="b.color">
            {{ b.label }}
          </ArchBadge>
        </ArchNode>
      </ArchLayer>

      <div />
      <div />
      <div />
      <div />
    </div>

    <!-- ══════════════════════════════════════
         LEGEND
         ══════════════════════════════════════ -->
    <ArchLegend :items="legendItems" class="mt-8" style="min-width: 920px" />
  </div>
</template>

<script setup lang="ts">
import ArchActor from './arch/Actor.vue';
import ArchBadge from './arch/Badge.vue';
import ArchNode from './arch/Node.vue';
import ArchLayer from './arch/Layer.vue';
import ArchHWire from './arch/HWire.vue';
import ArchVWire from './arch/VWire.vue';
import ArchLegend from './arch/Legend.vue';
import type { NodeData } from './arch/types';

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,300&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap',
    },
  ],
});

// ─── DATA ────────────────────────────────────────────────────────────────────

const nuxtNodes: NodeData[] = [
  {
    icon: '🗂',
    label: 'Catalog & Product',
    sub: '/catalogs, /catalogs/[slug], and /products/[slug]',
    badges: [
      { label: 'SSR', color: 'nuxt' },
      { label: 'Public', color: 'neutral' },
    ],
  },
  {
    icon: '🖼',
    label: 'Gallery Page',
    sub: '/gallery',
    badges: [
      { label: 'SSR', color: 'nuxt' },
      { label: 'Public', color: 'neutral' },
    ],
  },
  {
    icon: '✉️',
    label: 'Message Me',
    sub: '/contact -> send-email.post.ts → Resend',
    badges: [
      { label: 'Resend', color: 'infra-nuxt' },
      { label: 'Server Route', color: 'neutral' },
    ],
  },
  {
    icon: '👤',
    label: 'Profile & Address',
    sub: '/profile -> CRUD Addresses',
    badges: [{ label: 'Bearer Token', color: 'laravel' }],
  },
  {
    icon: '🛒',
    label: 'Cart & Checkout',
    sub: 'Pinia + localStorage',
    badges: [
      { label: 'Client-only', color: 'nuxt' },
      { label: 'No DB', color: 'neutral' },
    ],
  },
  {
    icon: '🔐',
    label: 'Google Login',
    sub: 'Redirect → Laravel Socialite',
    badges: [
      { label: 'OAuth 2.0', color: 'laravel' },
      { label: '← Token', color: 'nuxt' },
    ],
  },
];

const laravelNodes: NodeData[] = [
  {
    icon: '🔌',
    label: 'GET /catalogs',
    sub: 'List catalog',
    badges: [{ label: 'Public', color: 'neutral' }],
  },
  {
    icon: '🔌',
    label: 'GET /catalogs/{slug}',
    sub: 'Catalog + ',
    badges: [
      { label: 'Public', color: 'neutral' },
      { label: 'With Relations', color: 'neutral' },
    ],
  },
  {
    icon: '🔌',
    label: 'GET /products/{slug}',
    sub: 'Product details',
    badges: [{ label: 'Public', color: 'neutral' }],
  },
  {
    icon: '🔌',
    label: 'GET /gallery',
    sub: 'Gallery images list',
    badges: [{ label: 'Public', color: 'neutral' }],
  },
  {
    icon: '🔒',
    label: 'Profile & Address API',
    sub: 'CRUD Addresses — protected',
    badges: [{ label: 'Bearer Token', color: 'laravel' }],
  },
  {
    icon: '🔑',
    label: 'Google Socialite',
    sub: 'OAuth callback → issue token',
    badges: [
      { label: 'Socialite', color: 'laravel' },
      { label: '← Token', color: 'laravel' },
    ],
  },
];

const filamentNodes: NodeData[] = [
  {
    icon: '🗂',
    label: 'Catalog Management',
    sub: 'CRUD Catalog',
    badges: [
      { label: 'CRUD', color: 'filament' },
      { label: '→ R2', color: 'infra-laravel' },
    ],
  },
  {
    icon: '📦',
    label: 'Product Management',
    sub: 'CRUD Product',
    badges: [
      { label: 'CRUD', color: 'filament' },
      { label: '→ R2', color: 'infra-laravel' },
    ],
  },
  {
    icon: '🖼',
    label: 'Gallery Management',
    sub: 'CRUD Gallery',
    badges: [
      { label: 'CRUD', color: 'filament' },
      { label: '→ R2', color: 'infra-laravel' },
    ],
  },
  {
    icon: '👥',
    label: 'User & Role',
    sub: 'Manage user, role, permission',
    badges: [
      { label: 'Shield', color: 'filament' },
      { label: 'Spatie', color: 'neutral' },
    ],
  },
  {
    icon: '🛡',
    label: 'Permission System',
    sub: 'Granular permission per role',
    badges: [
      { label: 'RBAC', color: 'filament' },
      { label: 'spatie/permission', color: 'neutral' },
    ],
  },
];

const infraNuxtNodes: NodeData[] = [
  {
    icon: '📧',
    label: 'Resend',
    sub: 'Email delivery from Message Me\nvia server/api/send-email.post.ts',
    badges: [
      { label: 'Transactional', color: 'infra-nuxt' },
      { label: 'Direct', color: 'neutral' },
    ],
  },
];

const infraLaravelNodes: NodeData[] = [
  {
    icon: '🗄',
    label: 'Neon PostgreSQL',
    sub: 'Serverless DB — data, relationships, image URLs',
    badges: [
      { label: 'Serverless', color: 'infra-laravel' },
      { label: 'PostgreSQL', color: 'infra-laravel' },
    ],
  },
  {
    icon: '☁️',
    label: 'Cloudflare R2',
    sub: 'Object storage for images — S3-compat\nDB only stores upload URLs',
    badges: [
      { label: 'S3-compat', color: 'infra-laravel' },
      { label: 'Zero Egress', color: 'infra-laravel' },
    ],
  },
  {
    icon: '🔑',
    label: 'Google OAuth',
    sub: 'Identity provider via Socialite\nCallback handled by Laravel',
    badges: [
      { label: 'OAuth 2.0', color: 'laravel' },
      { label: 'External IdP', color: 'neutral' },
    ],
  },
];

const legendItems = [
  { label: 'Nuxt.js', color: '#41b883' },
  { label: 'Laravel API', color: '#ff2d20' },
  { label: 'Filament CMS', color: '#f59e0b' },
  { label: 'Infra Nuxt', color: '#a78bfa' },
  { label: 'Infra Laravel', color: '#60a5fa' },
  { label: 'Request / Data Flow' },
];
</script>
