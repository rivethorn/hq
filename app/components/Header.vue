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
    label: "GitHub",
    to: "https://github.com/rivethorn",
    target: "_blank",
  },
]);
</script>

<template>
  <UHeader mode="drawer">
    <template #title>
      <div class="inline-flex gap-2.5">
        <NuxtImg src="logo-trans.png" sizes="26" class="light:invert" />
        <h1>Rivethorn's HQ</h1>
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
