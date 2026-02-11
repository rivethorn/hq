<script setup lang="ts">
const { data: posts, error } = await useAsyncData("posts", () =>
  queryCollection("writing").order("date", "DESC").all(),
);

if (!posts.value || !error.value) createError({ statusCode: 404 });
</script>

<template>
  <div class="flex flex-col items-start justify-center gap-10 py-20">
    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3 }"
    >
      <h1 class="text-5xl font-black mb-6">My Writings</h1>
      <h3 class="text-xl font-medium text-muted">Everything I've written.</h3>
    </Motion>
    <div v-if="!posts?.values">Loading posts…</div>
    <div v-else class="-mt-8">
      <Motion
        v-for="(post, index) in posts"
        :key="post.title"
        :initial="{ opacity: 0, y: 20 }"
        :in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: index * 0.05 }"
        :in-view-options="{ once: true }"
      >
        <NuxtLink
          :to="post.path"
          class="post-card group flex flex-col gap-3.5 my-16 active:scale-[0.98] bg-elevated/10 shadow-md transition-all hover:bg-accented/30 duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted/50"
          :aria-label="`Read ${post.title}`"
          :style="{ '--stagger': index }"
        >
          <CrossedDiv
            class-name="pointer-events-none p-6 lg:p-8 h-full flex lg:flex-row items-center gap-5 lg:gap-5
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
              <h2 class="text-3xl font-bold">
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
      </Motion>
    </div>
  </div>
</template>
