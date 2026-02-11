<template>
  <UPageCard class="lg:p-10" variant="naked">
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
    >
      <div class="inline-flex items-center gap-6 -mt-4 mb-18">
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
        class="text-lg lg:text-xl font-medium text-toned mb-18 leading-relaxed"
      >
        I’m Hassan aka. Rivethorn, a software engineer and full-stack developer
        who enjoys building stuff — from full-fledged, beautiful websites that
        run like butter; to small, focused tools and powerful command-line
        utilities that get the job done without unnecessary complexity.
      </p>
    </Motion>
  </UPageCard>
</template>
