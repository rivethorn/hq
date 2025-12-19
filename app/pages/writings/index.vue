<script setup lang="ts">
const { data: posts, error } = await useAsyncData("posts", () =>
  queryCollection("writing").order("date", "DESC").all()
);

if (!posts.value || !error.value) createError({ statusCode: 404 });
</script>

<template>
  <div class="flex flex-col items-start justify-center gap-10 py-20">
    <h1 class="text-5xl font-black mb-6">All Writing</h1>
    <h3 class="text-xl font-medium text-muted">
      A complete archive of everything I've written.
    </h3>
    <div class="mx-auto min-w-full">
      <span class="text-lg font-semibold text-toned">{{
        new Date(posts!.at(0)!.date).getFullYear()
      }}</span>
      <NuxtLink v-for="(post, index) in posts" :key="post.title" :to="post.path"
        class="group flex flex-col gap-3.5 my-8 active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted/50"
        :style="{ '--stagger': index }">
        <UCard
          class=" h-full flex flex-col gap-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:bg-accented/10">
          <div class="flex flex-col lg:flex-row gap-3 items-center justify-between text-muted text-sm lg:text-base">
            <span class="text-lg font-semibold min-w-fit text-highlighted inline-flex w-full justify-start">{{
              post.title }}</span>
            <!-- <div class="w-full"></div> -->
            <div class="inline-flex w-full justify-start lg:justify-end">
              <span class="min-w-fit">{{
                new Date(post.date).toLocaleDateString("default", {
                  month: "short",
                  day: "2-digit",
                })
              }}</span>
              <span class="mx-2.5">·</span>
              <span class="min-w-fit">{{ post.ttr }}</span>
            </div>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
