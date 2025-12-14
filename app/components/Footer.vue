<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items: NavigationMenuItem[] = [
    {
        label: "Twitter",
        to: "https://x.com",
        target: "_blank",
    },
    {
        label: "GitHub",
        to: "https://github.com/rivethorn",
        target: "_blank",
    },
    {
        label: "RSS",
        to: "https://google.com",
        target: "_blank",
    },
];
</script>

<template>
    <USeparator />
    <UFooter>
        <template #left>
            <p class="text-muted text-sm">
                © {{ new Date().getFullYear() }} Hassan Qasemi. All rights reserved.
            </p>
        </template>

        <template #right>
            <UNavigationMenu :items="items" variant="link" />
        </template>
    </UFooter>
</template>
