<script setup lang="ts">
  import { withoutTrailingSlash } from "ufo";
const route = useRoute();
const slug = computed(() => withoutTrailingSlash(String(route.params.slug)));

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("writing").path(withoutTrailingSlash(String(route.path))).first()
);

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
});

const activeId = ref<string | null>(null);
let observer: IntersectionObserver | null = null;

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - 96;

  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });

  history.replaceState(
    null,
    '',
    `${route.path}#${id}`
  );
};

onMounted(() => {

  if (route.hash) {
    const id = route.hash.slice(1)
    requestAnimationFrame(() => {
      scrollTo(id)
    })
  }

  const headings = document.querySelectorAll('h2, h3, h4');

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    },
    {
      rootMargin: '-96px 0px -70% 0px',
      threshold: 0,
    }
  );

  headings.forEach((h) => observer!.observe(h));
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>


<template>
    <article class="max-w-[96%] lg:max-w-[92%] mx-auto border-x border-accented p-4 lg:p-8 mt-0 mb-0 min-h-screen">
      <aside v-if="page?.body?.toc?.links?.length" class="hidden 2xl:block fixed left-6 top-30 w-64">
        <UCard class="rounded-xl backdrop-blur" variant="outline">
          <span class="block text-xs uppercase tracking-wide text-muted mb-4">
            On this page
          </span>
          <ul class="space-y-2 text-sm">
            <li v-for="link in page.body.toc.links" :key="link.id" :class="{
              'ml-4': link.depth === 3,
              'ml-8': link.depth === 4,
            }">
              <UButton variant="ghost" @click="scrollTo(link.id)" class="text-left w-full transition-colors" :class="activeId === link.id
                ? 'text-primary'
                : 'text-muted hover:text-primary'
                ">
                {{ link.text }}
              </UButton>
            </li>
          </ul>
        </UCard>
      </aside>
      <Motion
      :initial="{ opacity: 0, y: 40 }"
    :in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.3 }">
        <UButton to="/" variant="link" color="neutral" size="xl"
          class="flex items-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary/80">
          <UIcon name="lucide-arrow-left" class="size-4" />
          <span>Go Home</span>
        </UButton>
        <div class="flex flex-col gap-6 mt-8">
          <div class="flex gap-3 text-muted text-sm lg:text-base">
            <span>{{ new Date(page?.date || "").toDateString() }}</span>
            <span>·</span>
            <span>{{ page?.ttr }}</span>
            <span>·</span>
            <span>{{ page?.tag }}</span>
          </div>
          <NuxtLink :to="route.path" class="text-4xl lg:text-5xl font-bold lg:leading-14 mb-4">
            <h2>{{
              page?.title
              }}</h2>
          </NuxtLink>
          <span class="text-muted text-xl lg:text-2xl">{{
            page?.description
            }}</span>
        </div>
        <div class="mt-8 lg:hidden border-2 border-muted rounded-lg px-3">
          <UAccordion :items="[{ label: 'On this page' }]">
            <template #content>
              <ul class="space-y-2 text-sm mt-2 mb-4">
                <li v-for="link in page?.body.toc?.links" :key="link.id" :class="{
                  'ml-4': link.depth === 3,
                  'ml-8': link.depth === 4,
                }">
                  <UButton variant="soft" @click="scrollTo(link.id)" class="text-left w-full text-toned p-2">
                    {{ link.text }}
                  </UButton>
                </li>
              </ul>
            </template>
          </UAccordion>
        </div>
        <NuxtImg :src="`/posts/${slug}.png`" class="pointer-events-none size-full mt-12 rounded-lg w-[95%] lg:w-[85%] mx-auto" fit="cover"
          :alt="slug" />
        <base target="_blank">
        <ContentRenderer :value="page!" class="prose mb-12 lg:px-2" />
        </base>
      </Motion>
    </article>
</template>
