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
        <NuxtImg src="logo-trans.png" class="light:invert group-hover:opacity-60 transition-opacity size-7" />
        <h1 class="group-hover:text-muted transition-colors">Rivethorn's HQ</h1>
      </div>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <ColorAnimBtn class="hover:cursor-pointer" />

      <UTooltip text="My GitHub">
        <UButton color="neutral" variant="ghost" to="https://github.com/rivethorn" target="_blank"
          icon="i-simple-icons-github" aria-label="GitHub" />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="mb-[20%]" />
    </template>
  </UHeader>
</template>
