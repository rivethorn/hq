<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { isChristmasSeason, seasonalEffectsEnabled } = useChristmasSeason();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Blog",
    to: "/",
    class: "p-3",
  },
  {
    label: "About",
    to: "/about",
    class: "p-3",
  },
  {
    label: "Writings",
    to: "/writings",
    class: "p-3",
  },
]);
</script>

<template>
  <UHeader mode="slideover">
    <template #title>
      <div class="inline-flex gap-2.5 group">
        <NuxtImg
          src="logo-trans.png"
          class="light:invert group-hover:opacity-60 transition-opacity size-7"
        />
        <h1 class="hidden lg:block group-hover:text-muted transition-colors">
          Rivethorn's HQ
        </h1>
        <h1 class="lg:hidden group-hover:text-muted transition-colors">RHQ</h1>
      </div>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <ClientOnly v-if="isChristmasSeason">
        <UTooltip text="Toggle Snowing effect" :delay-duration="5">
          <UButton
            @click="seasonalEffectsEnabled = !seasonalEffectsEnabled"
            icon="i-lucide-snowflake"
            :variant="seasonalEffectsEnabled ? 'subtle' : 'ghost'"
            :color="seasonalEffectsEnabled ? 'primary' : 'neutral'"
          />
        </UTooltip>
      </ClientOnly>
      <ColorAnimBtn />

      <UTooltip text="RSS Feed">
        <UButton
          color="neutral"
          variant="ghost"
          to="/rss.xml"
          target="_blank"
          icon="lucide-rss"
          aria-label="RSS"
        />
      </UTooltip>

      <UTooltip text="My GitHub">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/rivethorn"
          target="_blank"
          icon="lucide-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="p-1" />
    </template>
  </UHeader>
</template>
