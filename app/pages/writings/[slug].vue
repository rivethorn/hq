<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("writing").path(route.path).first()
);

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
});
</script>

<template>
  <article class="max-w-[96%] lg:max-w-[92%] mx-auto border-x border-accented p-4 lg:p-8 mt-0 mb-0 min-h-screen">
    <UButton @click="useRouter().back()" variant="link" color="neutral" size="xl"
      class="flex items-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary/80">
      <UIcon name="lucide-arrow-left" class="size-4" />
      <span>Back</span>
    </UButton>
    <div class="flex flex-col gap-6 mt-8">
      <div class="flex gap-3 text-muted text-sm lg:text-base">
        <span>{{ new Date(page?.date || "").toDateString() }}</span>
        <span>·</span>
        <span>{{ page?.ttr }}</span>
        <span>·</span>
        <span>{{ page?.tag }}</span>
      </div>
      <span class="text-4xl lg:text-5xl font-bold lg:leading-14 mb-4">{{
        page?.title
      }}</span>
      <span class="text-muted text-xl lg:text-2xl">{{
        page?.description
      }}</span>
    </div>
    <ContentRenderer :value="page!" class="prose mb-12" />
    <ScrollToTop />
  </article>
</template>
