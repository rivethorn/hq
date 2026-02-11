<script setup lang="ts">
const { enableSnowEffect } = useChristmasSeason();

const { data: posts, pending: postPending } = await useAsyncData(
  "posts-latest",
  () => queryCollection("writing").order("date", "DESC").limit(2).all(),
);

const { data: projects, pending: projectPending } = await useAsyncData(
  "projects-latest",
  () => queryCollection("projects").order("date", "DESC").limit(2).all(),
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

    <Suspense>
      <HomeProjects :projects="projects" />
      <template #fallback>
        <div
          class="my-12 text-centerf lex flex-col gap-4 justify-center items-center w-full"
        >
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"
          ></div>
          <p class="mt-4 text-toned">Loading projects...</p>
        </div>
      </template>
    </Suspense>

    <HomeBlogs :posts="posts" :is-loading="postPending" />

    <HomeCTA />
  </div>
</template>
