<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const color = useColorMode();

const items: TabsItem[] = [
  {
    icon: "i-tabler-device-desktop",
    value: "system",
  },
  {
    icon: "i-tabler-sun",
    value: "light",
  },
  {
    icon: "i-tabler-moon",
    value: "dark",
  },
];

const active = computed({
  get() {
    return color.preference;
  },
  set(tab) {
    color.preference = tab;
  },
});
</script>

<template>
  <UTabs v-model="active" :content="false" :items="items" size="xs" color="neutral" :ui="{
    indicator: 'rounded-full', list: 'rounded-full h-10'
  }" />
</template>
