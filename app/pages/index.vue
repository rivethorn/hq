<script setup lang="ts">
const { enableSnowEffect } = useChristmasSeason();
</script>

<template>
  <div class="flex flex-col items-start justify-center gap-1 py-20">
    <ClientOnly>
      <HomeMeteors v-if="!enableSnowEffect" :number="30" class="-z-10" />
    </ClientOnly>

    <HomeHero />

    <HomeStackSection />

    <HomeFeatures />

    <HomeAbout />

    <HomeBlogs />

    <HomeCTA />
  </div>
</template>

<style lang="css" scoped>
@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.animate-wave {
  animation: wave 2.5s infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
}

p {
  font-family: "IBM Plex Sans";
}
</style>
