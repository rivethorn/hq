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
          class="rounded-full size-15 lg:size-20 border-2 border-accented shadow-md"
        />
        <div class="hidden lg:flex items-center pointer-events-none">
          <TextPressure
            class="text-shadow-md"
            text="Oh hey, Welcome!"
            font-family="Source Sans 3"
            font-url="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
            :min-font-size="75"
            :flex="true"
            :italic="false"
            span-class="text-highlighted"
          >
          </TextPressure>
          <span
            class="text-4xl lg:text-5xl inline-block animate-wave m-2 text-shadow-md"
          >
            👋
          </span>
        </div>
        <div class="lg:hidden">
          <h1 class="text-4xl font-black text-shadow-md">
            Oh hey, Welcome!<span
              class="inline-block animate-wave m-2 text-shadow-md"
            >
              👋
            </span>
          </h1>
        </div>
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
</style>
