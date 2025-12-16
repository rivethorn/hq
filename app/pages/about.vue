<script setup lang="ts">
const { data: about } = await useAsyncData("about", () =>
  queryCollection("content").first()
);
</script>

<template>
  <div class="flex flex-col items-start justify-center gap-16">
    <h1 class="text-5xl font-black">About</h1>
    <ContentRenderer :value="about!" class="text-lg leading-relaxed font-medium" style="
        font-family:
          'ZT Nature Variable',
          sans-serif;
      " />
    <USeparator size="sm" />
    <h4 class="text-2xl font-bold -mt-4">Let's Connect</h4>
    <div class="flex flex-col -mt-8 gap-5">
      <NuxtLink class="links" to="https://x.com" target="_blank">Twitter / X</NuxtLink>
      <NuxtLink class="links" to="https://github.com/rivethorn" target="_blank">GitHub</NuxtLink>
      <NuxtLink class="links" to="https://threads.com" target="_blank">Threads</NuxtLink>
      <NuxtLink class="links" to="mailto:therivethorn@gmail.com" target="_blank">Email</NuxtLink>
    </div>
  </div>
</template>
