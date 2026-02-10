<template>
  <USeparator />
  <UFooter class="pb-10 lg:pb-20 pt-2">
    <template #left>
      <ColorThemeTab />
    </template>

    <template #right>
      <p class="text-muted text-sm">
        © {{ new Date().getFullYear() }} Hassan Qasemi
      </p>
    </template>
  </UFooter>

  <div class="flex justify-center">
    <Motion
      :initial="{ opacity: 0, y: 30 }"
      :in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3 }"
      :in-view-options="{ once: true }"
    >
      <NuxtImg
        src="/text.svg"
        class="w-[92%] lg:w-5xl light:invert mask-b-from-60%"
      />
    </Motion>
  </div>
</template>
