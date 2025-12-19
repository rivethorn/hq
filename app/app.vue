<script setup lang="ts">
useSeoMeta({
  title: "Rivethorn's HQ",
  ogTitle: "Rivethorn's HQ",
  description:
    "This is where you can read my blogs, thoughts and essays on programming and technology.",
  ogDescription:
    "This is where you can read my blogs, thoughts and essays on programming and technology.",
});

const progress = ref(0);

onMounted(() => {
  const onScroll = () => {
    const scrollTop = window.scrollY
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    progress.value = height > 0 ? scrollTop / height : 0
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  onScroll()

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll)
  })
});
</script>

<template>
  <UApp>
    <NuxtPwaAssets />

    <div v-if="useRoute().path.startsWith('/writings/')" class="fixed top-0 left-0 right-0 h-0.5 z-40">
      <div class="h-full origin-left bg-primary" :style="{ transform: `scaleX(${progress})` }" />
    </div>

    <div class="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div class="absolute inset-[-200%] size-[400%] bg-[url('/noise.png')] opacity-3 lg:opacity-4" />
    </div>

    <UMain>
      <Header />
      <NuxtRouteAnnouncer />
      <NuxtPage class="max-w-[92%] lg:w-5xl mx-auto" />
    </UMain>

    <Footer />
  </UApp>

</template>
