<script setup lang="ts">
import useConfetti from "canvas-confetti";

const { isChristmasSeason, seasonalEffectsEnabled } = useChristmasSeason();

const triggerConfetti = () => {
  const colors = ["#d3869b", "#f28534"];
  const end = Date.now() + 0.5 * 1000;
  function frame() {
    useConfetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 30,
      origin: { x: 0 },
      colors: colors,
    });
    useConfetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 30,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
};
</script>

<template>
  <ClientOnly v-if="isChristmasSeason">
    <UTooltip text="Toggle Snowing effect" :delay-duration="5">
      <UButton
        @click="seasonalEffectsEnabled = !seasonalEffectsEnabled"
        v-on:click="triggerConfetti"
        icon="i-lucide-snowflake"
        :variant="seasonalEffectsEnabled ? 'subtle' : 'ghost'"
        :color="seasonalEffectsEnabled ? 'primary' : 'neutral'"
      />
    </UTooltip>
  </ClientOnly>
</template>
