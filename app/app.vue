<template>
  <UApp>
    <Header />

    <UMain>
      <div class="pointer-events-none fixed inset-0 z-40 size-full overflow-hidden">
        <div class="pointer-events-none absolute inset-[-200%] z-50 size-[400%] bg-[url('/noise.png')] opacity-4" />
      </div>
      <NuxtRouteAnnouncer />
      <NuxtPage class="max-w-[92%] lg:w-5xl mx-auto my-20" />
    </UMain>

    <Footer />
  </UApp>
</template>
