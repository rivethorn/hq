<script setup lang="ts">
const { data: projects, error } = await useAsyncData("projects-all", () =>
  queryCollection("projects").order("date", "DESC").all(),
);

if (!projects.value || !error.value) createError({ statusCode: 404 });
</script>

<template>
  <div class="flex flex-col items-start justify-center gap-10 py-20">
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3 }"
      :in-view-options="{ once: true }"
    >
      <h1 class="text-5xl font-black mb-6">My Projects</h1>
      <h3 class="text-xl font-medium text-muted">Everything I've worked on.</h3>
    </Motion>
    <div v-if="!projects?.values">Loading projects…</div>
    <div v-else>
      <Motion
        v-for="(project, index) in projects"
        :key="index"
        :initial="{ opacity: 0, y: 20 }"
        :in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: index * 0.05 }"
        :in-view-options="{ once: true }"
        class="group flex flex-col my-8 gap-3.5 active:scale-[0.98] bg-elevated/10 shadow-md transition-all hover:bg-accented/30 duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted/50"
      >
        <CrossedDiv
          class-name="p-6 lg:p-8 h-full flex lg:flex-row items-center gap-5 lg:gap-5
            transition-all duration-300
            ease-[cubic-bezier(0.22,1,0.36,1)]
            hover:shadow-xl hover:shadow-black/5"
        >
          <UPageCard
            :title="project.title"
            :description="project.description"
            orientation="horizontal"
            variant="naked"
            :reverse="index % 2 === 1"
            class="group"
            :ui="{
              wrapper: 'max-sm:order-last',
            }"
          >
            <template #leading>
              <span class="text-sm text-muted">
                {{ new Date(project.date).getFullYear() }}
              </span>
            </template>
            <template #footer>
              <div class="flex gap-2">
                <UButton
                  label="View Project"
                  :to="project.url"
                  variant="subtle"
                />
                <UButton
                  v-if="project.story"
                  label="The Story"
                  :to="project.story"
                  variant="subtle"
                  color="neutral"
                />
              </div>
            </template>
            <NuxtImg
              :src="project.image"
              :alt="project.title"
              class="object-cover w-full h-auto rounded-lg"
              :class="[
                project.title === 'DotDeck' ? 'max-w-3xs mx-auto' : '',
                project.title === 'GitHub OAuth for Rust'
                  ? 'max-w-48 dark:invert mx-auto opacity-80'
                  : '',
              ]"
            />
          </UPageCard>
        </CrossedDiv>
      </Motion>
    </div>
  </div>
</template>
