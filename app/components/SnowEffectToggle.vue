<script setup lang="ts">
const { isChristmasSeason, seasonalEffectsEnabled } = useChristmasSeason();
</script>

<template>
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
</template>
