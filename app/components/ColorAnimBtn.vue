<script setup lang="ts">
const colorMode = useColorMode();

const modes = ["light", "dark", "system"] as const;
type Mode = (typeof modes)[number];

const currentPreference = computed<Mode>(() => {
  if (colorMode.preference === "system") return "system";
  return (colorMode.preference as Mode) ?? "system";
});

const nextTheme = computed<Mode>(() => {
  const index = modes.indexOf(currentPreference.value);
  return modes[(index + 1) % modes.length];
});

const switchTheme = () => {
  colorMode.preference = nextTheme.value;
};

const startViewTransition = (event: MouseEvent) => {
  if (!document.startViewTransition) {
    switchTheme();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const transition = document.startViewTransition(() => {
    switchTheme();
  });

  transition.ready.then(() => {
    const duration = 600;
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: duration,
        easing: "cubic-bezier(.76,.32,.29,.99)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
};
</script>

<template>
  <ClientOnly>
    <UTooltip
      :text="
        colorMode.preference === 'dark'
          ? 'Theme: Dark mode'
          : colorMode.value === 'light'
            ? 'Theme: Light mode'
            : 'Theme: Based on System'
      "
    >
      <UButton
        :aria-label="`Switch to ${nextTheme} mode`"
        :icon="`i-tabler-${nextTheme === 'dark' ? 'sun' : nextTheme === 'light' ? 'device-desktop' : 'moon'}`"
        color="neutral"
        variant="ghost"
        @click="startViewTransition"
      />
    </UTooltip>
    <template #fallback>
      <div class="size-4" />
    </template>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}

::view-transition-old(root) {
  z-index: 1;
}
</style>
