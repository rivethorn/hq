<script setup lang="ts">
import type { Metadata } from "../index.vue";

const supabase = useSupabaseClient();
const route = useRoute();
const ast = ref<any>(null);
const meta = ref<Metadata>();
const slug = route.params.slug as string;
const loading = ref(true);

async function loadMeta() {
  const { data, error } = await supabase
    .from("posts")
    .select("title, created_at, summary, tag, time_to_read")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  meta.value = data;
}

async function loadFile() {
  const { data, error } = await supabase.storage
    .from("blog")
    .download(`${slug}.md`);

  if (error) {
    console.error(error);
    return;
  }

  const markdown = await data.text();

  ast.value = await parseMarkdown(markdown);
}

onMounted(async () => {
  await loadMeta();
  loadFile();
  loading.value = false;
});
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
    <TransitionGroup v-if="!loading" name="list" tag="div" class="-mt-8" appear>
      <div class="flex flex-col gap-6 mt-10">
        <div class="flex gap-3 text-muted text-sm lg:text-base">
          <span>{{ new Date(meta?.created_at || "").toDateString() }}</span>
          <span>·</span>
          <span>{{ meta?.time_to_read }}</span>
          <span>·</span>
          <span>{{ meta?.tag }}</span>
        </div>
        <span class="text-4xl lg:text-5xl font-bold lg:leading-14">{{
          meta?.title
        }}</span>
        <span class="text-muted text-xl lg:text-2xl">{{ meta?.summary }}</span>
      </div>
      <MDC
        :value="ast"
        class="prose prose-neutral dark:prose-invert animate-in"
      />
    </TransitionGroup>

    <p v-else class="text-center text-4xl animate-pulse mx-auto mt-20">
      Loading...
    </p>
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
