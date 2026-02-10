<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const btn: ButtonProps = {
  label: "Get in Touch",
  color: "neutral",
  variant: "subtle",
};
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 20 }"
    :in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5 }"
    :in-view-options="{ once: true }"
    class="mb-28 mt-28 mx-auto"
  >
    <UPageCTA
      title="Let's Build Something Together!"
      description="Have a project in mind or just want to say hi? I’d love to collaborate and bring your ideas to life. Reach out and let’s make it happen!"
    >
      <template #links>
        <InteractiveHoverBtn
          text="Get in Touch"
          to="mailto:hassanak813@outlook.com"
        />
      </template>
    </UPageCTA>
  </Motion>
</template>
