<script setup lang="ts">
import type { Metadata } from "../index.vue";

const supabase = useSupabaseClient();
const route = useRoute();
const ast = ref<any>(null);
const meta = ref<Metadata>();
const slug = route.params.slug as string;

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
});
</script>

<template>
  <article class="mx-auto pb-5 mt-10">
    <UButton
      to="/"
      variant="link"
      color="neutral"
      size="xl"
      class="inline-flex items-center gap-2 hover:text-primary/80"
    >
      ← Back
    </UButton>
    <div v-if="ast">
      <div class="flex flex-col gap-6 my-4">
        <div class="flex gap-3 text-muted">
          <span>{{ new Date(meta?.created_at || "").toDateString() }}</span>
          <span>·</span>
          <span>{{ meta?.time_to_read }}</span>
          <span>·</span>
          <span>{{ meta?.tag }}</span>
        </div>
        <span class="text-4xl lg:text-5xl font-bold">{{ meta?.title }}</span>
        <span class="text-muted text-2xl">{{ meta?.summary }}</span>
      </div>
      <MDC
        :value="ast"
        class="prose prose-neutral dark:prose-invert animate-in"
      />
    </div>
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
</style>
