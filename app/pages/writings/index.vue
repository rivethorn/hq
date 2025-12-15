<script setup lang="ts">
import type { createTypeReferenceDirectiveResolutionCache } from "typescript";
import type { Metadata } from "../index.vue";

const supabase = useSupabaseClient();

const meta = useState<Metadata[]>("posts-meta-all", () => []);
const loading = useState<boolean>("posts-loading-all", () => true);

onMounted(async () => {
  if (meta.value.length > 0) {
    loading.value = false;
    return;
  }

  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error(error);
    return;
  }

  meta.value = data
    .map((file: Metadata) => ({
      title: file.title,
      tag: file.tag,
      created_at: file.created_at,
      time_to_read: file.time_to_read,
      slug: file.slug,
      summary: file.summary,
    }))
    .sort((a, b) => {
      // newest first
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

  loading.value = false;
});
</script>

<template>
  <div class="flex flex-col items-start justify-center gap-10">
    <h1 class="text-5xl font-black">All Writing</h1>
    <h3 class="text-xl font-medium text-muted">
      A complete archive of everything I've written.
    </h3>
    <TransitionGroup v-if="!loading" name="list" tag="div" class="" appear>
      <span class="text-lg font-semibold text-toned">{{
        new Date(meta.at(0)!.created_at).getFullYear()
      }}</span>
      <NuxtLink
        v-for="(file, index) in meta"
        :key="file.slug"
        :to="`/writings/${file.slug}`"
        class="group flex flex-col gap-3.5 my-8 active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted/50"
        :style="{ '--stagger': index }"
      >
        <UCard
          class-name="p-8 h-full flex flex-col gap-3.5
    transition-all duration-300
    ease-[cubic-bezier(0.22,1,0.36,1)]
    hover:shadow-xl hover:shadow-black/5"
        >
          <div
            class="flex gap-3 items-center justify-between text-muted text-sm lg:text-base"
          >
            <span class="text-lg font-semibold min-w-fit text-highlighted">{{
              file.title
            }}</span>
            <div class="w-full"></div>
            <span class="min-w-fit">{{
              new Date(file.created_at).toLocaleDateString("default", {
                month: "short",
                day: "2-digit",
              })
            }}</span>
            <span>·</span>
            <span class="min-w-fit">{{ file.time_to_read }}</span>
          </div>
        </UCard>
      </NuxtLink>
    </TransitionGroup>

    <p v-else class="text-center text-4xl animate-pulse mx-auto mt-20">
      Loading...
    </p>
  </div>
</template>

<style scoped>
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
