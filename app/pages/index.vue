<script setup lang="ts">
definePageMeta({
  ssr: true,
});

const { enableSnowEffect } = useChristmasSeason();

const { data: posts, error } = await useAsyncData("posts", () =>
  queryCollection("writing").order("date", "DESC").limit(5).all()
);
</script>

<template>
  <div class="flex flex-col items-start justify-center gap-10 py-20">
    <ClientOnly>
      <Meteors v-if="!enableSnowEffect" :number="30" class="-z-10" />
    </ClientOnly>
    <h1 class="subtle-highlight text-5xl font-black mb-6">Oh hey, welcome!</h1>
    <h3 class="text-xl font-medium text-muted">
      Glad to see you here, I'm Hassan. <br />
      This is where I write my thoughts & essays on programming, technology, and
      the intersection of creativity and engineering. I'll also just rant
      sometimes.
    </h3>
    <div v-if="!posts?.values">Loading posts…</div>
    <div v-else class="-mt-8">
      <NuxtLink
        v-for="(post, index) in posts"
        :key="post.title"
        :to="post.path"
        class="post-card group flex flex-col gap-3.5 my-16 active:scale-[0.98] bg-elevated/10 shadow-md transition-all hover:bg-accented/30 duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted/50"
        :aria-label="`Read ${post.title}`"
        :style="{ '--stagger': index }"
      >
        <CrossedDiv
          class-name="p-6 lg:p-8 h-full flex lg:flex-row items-center gap-5 lg:gap-5
    transition-all duration-300
    ease-[cubic-bezier(0.22,1,0.36,1)]
    hover:shadow-xl hover:shadow-black/5"
        >
          <NuxtImg
            :src="`posts/${post.path.split('/').at(-1)}.png`"
            class="flex rounded-md h-fit lg:max-w-2/5"
            fit="contain"
          />
          <div class="flex flex-col gap-3 lg:min-w-3/5">
            <div class="flex gap-3 text-muted text-sm lg:text-base">
              <span>{{ new Date(post.date).toDateString() }}</span>
              <span>·</span>
              <span>{{ post.ttr }}</span>
              <span>·</span>
              <span>{{ post.tag }}</span>
            </div>
            <h2 class="subtle-highlight text-3xl font-bold">
              {{ post.title }}
            </h2>
            <span class="text-muted text-base lg:text-xl">{{
              post.description
            }}</span>
            <div
              class="flex items-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:gap-4"
            >
              <span class="group-hover:text-muted">Read more</span>
              <UIcon
                name="lucide-arrow-right"
                class="size-5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </CrossedDiv>
      </NuxtLink>

      <UButton
        label="See more"
        color="neutral"
        to="/writings"
        size="xl"
        class="text-lg rounded-md px-4 mt-5 transition-all hover:-translate-y-0.5 active:translate-y-1 dark:text-2xl"
        variant="outline"
      />
    </div>
  </div>
</template>

<style scoped>
.subtle-highlight {
  &:where(.dark, .dark *) {
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  }

  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}
</style>
