<script setup lang="ts">
const { enableSnowEffect } = useChristmasSeason();

const { data: posts } = await useAsyncData("posts-latest", () =>
  queryCollection("writing").order("date", "DESC").limit(2).all(),
);

const { data: projects } = await useAsyncData("projects-latest", () =>
  queryCollection("projects").order("date", "DESC").limit(2).all(),
);
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

    <HomeProjects :projects="projects ?? []" />

    <HomeBlogs :posts="posts ?? []" />

    <HomeCTA />
  </div>
</template>
