<script setup lang="ts">
import type { WritingCollectionItem } from "@nuxt/content";

const { posts } = defineProps<{
  posts: WritingCollectionItem[] | undefined;
}>();

interface BlogFeature {
  title: string;
  description: string;
  to: string;
}

let blogs: BlogFeature[] = [];

posts?.map((v) => {
  blogs.push({ title: v.title, description: v.description, to: v.path });
});
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 16 }"
    :in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.4 }"
    :in-view-options="{ once: true }"
    class="text-3xl font-black mb-8"
    >My latest writings</Motion
  >
  <div class="grid md:grid-cols-1 gap-8 mb-18">
    <Motion
      v-for="(blog, index) in blogs"
      :key="blog.title"
      :initial="{ opacity: 0, y: 16 }"
      :in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, delay: index * 0.05 }"
      :in-view-options="{ once: true }"
    >
      <UPageCard
        :title="blog.title"
        :description="blog.description"
        :to="blog.to"
        variant="subtle"
        orientation="horizontal"
        :ui="{
          title: 'mb-4',
          leadingIcon: 'size-6',
        }"
      >
        <NuxtImg
          :src="`posts/${blog.to.split('/').at(-1)}.png`"
          class="flex rounded-md"
          fit="contain"
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
        label="Explore My Writings"
        variant="subtle"
        to="/writings"
        size="xl"
        class="min-w-52 flex justify-center"
      />
    </Motion>
  </div>
</template>
