<script setup lang="ts">
import type { ProjectsCollectionItem } from "@nuxt/content";

const { projects } = defineProps<{
  projects: ProjectsCollectionItem[] | undefined;
}>();

interface ProjectsFeature {
  title: string;
  description: string;
  to: string;
  img: string;
  date: string;
}

const projectsList: ProjectsFeature[] =
  projects?.map((v) => ({
    title: v.title,
    description: v.description,
    to: v.url,
    img: v.image,
    date: v.date,
  })) || [];
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 16 }"
    :in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.4 }"
    :in-view-options="{ once: true }"
    class="text-3xl font-black mb-8 tracking-tighter"
  >
    My latest projects
  </Motion>
  <div class="grid md:grid-cols-1 gap-8 mb-18">
    <Motion
      v-for="(project, index) in projectsList"
      :key="project.title"
      :initial="{ opacity: 0, y: 16 }"
      :in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, delay: index * 0.05 }"
      :in-view-options="{ once: true }"
    >
      <UPageCard
        :title="project.title"
        :description="project.description"
        :to="project.to"
        target="_blank"
        variant="subtle"
        orientation="horizontal"
        :ui="{
          title: 'mb-4',
          leadingIcon: 'size-6',
        }"
      >
        <template #footer>
          <span class="text-muted text-sm">{{
            new Date(project.date).getFullYear()
          }}</span>
        </template>
        <NuxtImg
          :src="project.img"
          class="flex rounded-md"
          fit="contain"
          :class="[
            project.title === 'DotDeck' ? 'max-w-3xs mx-auto' : '',
            project.title === 'GitHub OAuth for Rust'
              ? 'max-w-48 dark:invert mx-auto opacity-80'
              : '',
          ]"
        />
      </UPageCard>
    </Motion>
    <Motion
      :initial="{ opacity: 0, y: 16 }"
      :in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4 }"
      :in-view-options="{ once: true }"
      class="flex justify-end"
    >
      <UButton
        label="Browse Projects"
        variant="subtle"
        to="/projects"
        size="xl"
        class="min-w-52 flex justify-center"
      />
    </Motion>
  </div>
</template>
