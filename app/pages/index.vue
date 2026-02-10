<script setup lang="ts">
definePageMeta({
  ssr: true,
});

const { enableSnowEffect } = useChristmasSeason();

const { data: posts } = await useAsyncData("posts", () =>
  queryCollection("writing").order("date", "DESC").limit(3).all(),
);
</script>

<template>
  <div class="flex flex-col items-start justify-center gap-1 py-20">
    <ClientOnly>
      <Meteors v-if="!enableSnowEffect" :number="30" class="-z-10" />
    </ClientOnly>
    <UPageCard class="lg:p-10" variant="naked">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
      >
        <div class="inline-flex items-center gap-6 -mt-4 mb-4">
          <NuxtImg
            src="profile.jpeg"
            class="rounded-full size-15 lg:size-20 border-2 border-accented"
          />
          <h1 class="text-4xl lg:text-5xl font-black">
            Oh hey, Welcome!<span className="inline-block animate-wave m-2"
              >👋</span
            >
          </h1>
        </div>
      </Motion>
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.15 }"
      >
        <p
          class="text-base lg:text-xl font-medium text-toned mb-8 leading-relaxed"
        >
          I’m Hassan, a software engineer and full-stack developer who enjoys
          building stuff — from full-fledged, beautiful websites that run like
          butter; to small, focused tools and powerful command-line utilities
          that get the job done without unnecessary complexity.
        </p>
      </Motion>
    </UPageCard>
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
      :in-view-options="{ once: true }"
    >
      <StackSection />
    </Motion>
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
