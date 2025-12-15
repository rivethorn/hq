<script lang="ts">
export interface Metadata {
  title: string;
  created_at: string;
  tag: string;
  time_to_read: string;
  slug: string;
  summary: string;
}
</script>

<script setup lang="ts">
const supabase = useSupabaseClient();

const meta = useState<Metadata[]>("posts-meta", () => []);
const loading = useState<boolean>("posts-loading", () => true);

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
    <Meteors :number="30" class="-z-10" />
    <h1 class="text-5xl font-black">Oh hey, welcome!</h1>
    <h3 class="text-xl font-medium text-muted">
      Glad to see you here, I'm Hassan. <br />
      This is where I write my thoughts & essays on programming, technology, and
      the intersection of creativity and engineering. I'll also just rant
      sometimes.
    </h3>
    <TransitionGroup v-if="!loading" name="list" tag="div" class="-mt-8" appear>
      <NuxtLink
        v-for="(file, index) in meta"
        :key="file.slug"
        :to="`/writings/${file.slug}`"
        class="group flex flex-col gap-3.5 my-16 active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted/50"
        :style="{ '--stagger': index }"
      >
        <CrossedDiv
          class-name="p-8 h-full flex flex-col gap-3.5
    transition-all duration-300
    ease-[cubic-bezier(0.22,1,0.36,1)]
    hover:shadow-xl hover:shadow-black/5"
        >
          <div class="flex gap-3 text-muted text-sm lg:text-base">
            <span>{{ new Date(file.created_at).toDateString() }}</span>
            <span>·</span>
            <span>{{ file.time_to_read }}</span>
            <span>·</span>
            <span>{{ file.tag }}</span>
          </div>
          <span class="text-3xl font-bold">{{ file.title }}</span>
          <span class="text-muted text-xl">{{ file.summary }}</span>
          <div
            class="flex items-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:gap-4"
          >
            <span class="group-hover:text-muted">Read more</span>
            <UIcon
              name="lucide-arrow-right"
              class="size-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </CrossedDiv>
      </NuxtLink>
    </TransitionGroup>

    <p v-else class="text-center text-4xl animate-pulse mx-auto mt-20">
      Loading...
    </p>
  </div>
</template>

<style scoped>
@reference "../assets/css/main.css";
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
