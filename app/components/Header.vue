<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Blog",
    to: "/",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Writings",
    to: "/writings",
  },
]);
</script>

<template>
  <UHeader mode="drawer">
    <template #title>
      <div class="inline-flex gap-2.5 group">
        <NuxtImg
          src="logo-trans.png"
          sizes="26"
          class="light:invert group-hover:opacity-60 transition-opacity"
        />
        <h1 class="group-hover:text-muted transition-colors">Rivethorn's HQ</h1>
      </div>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <ColorAnimBtn />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="mb-[20%]" />
    </template>
  </UHeader>
</template>
