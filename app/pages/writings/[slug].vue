<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("writing").path(route.path).first()
);
</script>

<template>
  <article
    class="max-w-[96%] lg:max-w-[92%] mx-auto border-x border-accented p-4 lg:p-8 mt-0 mb-0 min-h-screen"
  >
    <UButton
      @click="useRouter().back()"
      variant="link"
      color="neutral"
      size="xl"
      class="flex items-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary/80"
    >
      <UIcon name="lucide-arrow-left" class="size-4" />
      <span>Back</span>
    </UButton>
    <TransitionGroup name="list" tag="div" class="-mt-2" appear>
      <div class="flex flex-col gap-6 mt-10">
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
      <ContentRenderer :value="page!" class="prose" />
    </TransitionGroup>
  </article>
</template>

<style scoped>
.animate-in {
  animation: fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-in {
    animation: none;
  }
}

@reference "../../assets/css/main.css";
.list-enter-from {
  @apply opacity-0 translate-y-8;
}

.list-enter-to {
  @apply opacity-100 translate-y-0;
}

.list-enter-active {
  @apply transition-all duration-700
         ease-[cubic-bezier(0.22,1,0.36,1)];
  transition-delay: calc(var(--stagger) * 120ms);
}

@media (prefers-reduced-motion: reduce) {
  .list-enter-active {
    transition: none;
  }
}
</style>
