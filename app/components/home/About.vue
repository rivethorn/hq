<template>
  <Motion
    :initial="{ opacity: 0, y: 20 }"
    :in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5 }"
    :in-view-options="{ once: true }"
    class="mb-12"
  >
    <UPageCard class="lg:p-10" variant="naked">
      <p
        class="text-base lg:text-xl font-medium text-toned mb-8 leading-relaxed"
      >
        Beyond code, I’m also documenting how I think and build — from deep
        dives into Rust to Nuxt project walkthroughs — and sharing the process
        with others. That’s partly why I’m thinking of starting a YouTube series
        focused on calm, project-driven programming in different operating
        systems: it’s about the craft, not the bells and whistles.
      </p>
      <p
        class="text-base lg:text-xl font-medium text-toned mb-8 leading-relaxed"
      >
        When I’m not writing code, I’m learning something new, tinkering with
        systems, or planning the next project. I try to approach problems the
        same way I approach life: with curiosity, patience, and a willingness to
        explore until the right solution reveals itself.
      </p>
      <p
        class="text-base lg:text-xl font-medium text-toned mb-8 leading-relaxed"
      >
        If you like thoughtful software, clear explanations, and projects built
        with intention, hit me up; we can be good friends!
      </p>
    </UPageCard>
  </Motion>
</template>

<style lang="css" scoped>
p {
  font-family: "IBM Plex Sans";
}
</style>
