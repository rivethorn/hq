<script setup lang="ts">
definePageMeta({
    prerender: true,
});

const { enableSnowEffect } = useChristmasSeason();

const { data: home } = await useAsyncData("home", () => queryCollection("home").first());

const { data: projects } = await useAsyncData("projects-latest", () =>
    queryCollection("projects").order("date", "DESC").limit(3).all(),
);

const { data: posts } = await useAsyncData("posts-latest", () =>
    queryCollection("writing").order("date", "DESC").limit(3).all(),
);

if (!home.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Home content not found",
    });
}
</script>

<template>
    <div class="relative overflow-hidden pb-20 pt-24 sm:pt-32">
        <ClientOnly>
            <HomeMeteors v-if="!enableSnowEffect" :number="30" class="-z-50" />
        </ClientOnly>

        <Motion
            :initial="{ opacity: 0, y: 18 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.65 }"
        >
            <UPageHero
                :title="home?.title"
                :description="home?.description"
                :ui="{
                    root: 'pb-16 pt-4 sm:pb-24',
                    container: 'max-w-5xl',
                    title: 'max-w-3xl text-left text-5xl font-semibold tracking-[-0.04em] sm:text-7xl',
                    description:
                        'max-w-2xl text-left text-lg leading-relaxed text-muted sm:text-xl',
                }"
            >
                <template #headline>
                    <div class="flex flex-wrap items-center gap-3 text-sm text-muted">
                        <span class="inline-flex items-center gap-2">
                            <span class="relative flex size-2">
                                <span
                                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-85"
                                />
                                <span class="relative inline-flex size-2 rounded-full bg-primary" />
                            </span>
                            {{ home?.availability }}
                        </span>
                        <span v-if="home?.location" aria-hidden="true">/</span>
                        <span>{{ home?.location }}</span>
                    </div>
                </template>
                <template #links>
                    <div class="flex w-full flex-wrap justify-end gap-3">
                        <UButton
                            to="/projects"
                            label="View projects"
                            trailing-icon="lucide-arrow-up-right"
                            variant="subtle"
                            size="lg"
                        />
                        <UButton
                            to="/writings"
                            label="Read the writings"
                            variant="outline"
                            color="neutral"
                            size="lg"
                        />
                    </div>
                </template>
            </UPageHero>
        </Motion>

        <Motion
            :initial="{ opacity: 0, y: 22 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.55, delay: 0.12 }"
        >
            <UPageSection
                title="A little about the work"
                :ui="{
                    container: 'max-w-5xl pt-8 sm:pt-12',
                    title: 'text-2xl sm:text-3xl',
                }"
            >
                <template #body>
                    <div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_12rem]">
                        <ContentRenderer v-if="home" :value="home" class="prose max-w-2xl" />
                        <aside class="h-fit border-l border-accented pl-5 text-sm text-muted">
                            <p class="mb-3 font-medium text-default">Currently exploring</p>
                            <p>
                                Rust, My own language, developer tooling, and the small details that
                                make software feel good.
                            </p>
                        </aside>
                    </div>
                </template>
            </UPageSection>
        </Motion>

        <Motion
            :initial="{ opacity: 0, y: 22 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.55, delay: 0.2 }"
        >
            <UPageSection
                title="Selected projects"
                description="A few things I’ve made recently."
                :ui="{
                    container: 'max-w-5xl',
                    title: 'text-2xl sm:text-3xl',
                    description: 'text-muted',
                }"
            >
                <template #body>
                    <div class="divide-y divide-accented border-b border-accented">
                        <Motion
                            v-for="(project, index) in projects"
                            :key="project.title"
                            :initial="{ opacity: 0, x: -10 }"
                            :animate="{ opacity: 1, x: 0 }"
                            :transition="{ duration: 0.4, delay: 0.25 + index * 0.07 }"
                            class="group border-t border-accented py-7 transition-colors first:border-t"
                        >
                            <div
                                class="grid gap-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-start sm:gap-8"
                            >
                                <span class="text-sm tabular-nums text-muted">{{
                                    new Date(project.date).getFullYear()
                                }}</span>
                                <div class="max-w-2xl">
                                    <h2
                                        class="flex items-center gap-1 text-xl font-bold tracking-tight"
                                    >
                                        {{ project.title }}
                                        <span v-if="project.stack">·</span>
                                        <span class="text-base font-medium text-muted">{{
                                            project.stack
                                        }}</span>
                                    </h2>
                                    <p class="mt-2 leading-relaxed text-muted">
                                        {{ project.description }}
                                    </p>
                                </div>
                                <div class="flex gap-2 justify-end">
                                    <UButton
                                        label="View"
                                        :to="project.url"
                                        target="_blank"
                                        variant="link"
                                        color="neutral"
                                        trailing-icon="lucide-arrow-up-right"
                                    />
                                    <UButton
                                        v-if="project.story"
                                        label="Story"
                                        :to="project.story"
                                        variant="link"
                                        color="neutral"
                                        trailing-icon="lucide-arrow-right"
                                    />
                                </div>
                            </div>
                        </Motion>
                    </div>
                    <div class="mt-6">
                        <UButton
                            to="/projects"
                            label="All projects"
                            variant="link"
                            color="neutral"
                            trailing-icon="lucide-arrow-right"
                        />
                    </div>
                </template>
            </UPageSection>
        </Motion>

        <Motion
            :initial="{ opacity: 0, y: 22 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.55, delay: 0.28 }"
        >
            <UPageSection
                title="From the notebook"
                description="Notes on building, learning, and changing direction."
                :ui="{
                    container: 'max-w-5xl',
                    title: 'text-2xl sm:text-3xl',
                    description: 'text-muted',
                }"
            >
                <template #body>
                    <div class="divide-y divide-accented border-b border-accented">
                        <Motion
                            v-for="(post, index) in posts"
                            :key="post.path"
                            :initial="{ opacity: 0, x: -10 }"
                            :animate="{ opacity: 1, x: 0 }"
                            :transition="{ duration: 0.4, delay: 0.33 + index * 0.07 }"
                            class="border-t border-accented first:border-t"
                        >
                            <NuxtLink
                                :to="post.path"
                                class="group relative block py-8 pr-10 transition-colors hover:bg-elevated/40"
                            >
                                <div
                                    class="grid gap-6 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-start sm:gap-10"
                                >
                                    <div class="text-sm text-muted">
                                        <p>{{ new Date(post.date).toDateString() }}</p>
                                        <p class="mt-1">{{ post.ttr }} · {{ post.tag }}</p>
                                    </div>
                                    <div class="max-w-2xl">
                                        <h2 class="text-xl font-medium tracking-tight">
                                            {{ post.title }}
                                        </h2>
                                        <p class="mt-1 leading-relaxed text-muted">
                                            {{ post.description }}
                                        </p>
                                    </div>
                                </div>
                                <UIcon
                                    name="lucide-arrow-up-right"
                                    class="absolute right-0 top-0 size-8 -translate-y-2 translate-x-2 shrink-0 transition-transform group-hover:scale-110"
                                />
                            </NuxtLink>
                        </Motion>
                    </div>
                    <div class="mt-6">
                        <UButton
                            to="/writings"
                            label="All writings"
                            variant="link"
                            color="neutral"
                            trailing-icon="lucide-arrow-right"
                        />
                    </div>
                </template>
            </UPageSection>
        </Motion>

        <Motion
            :initial="{ opacity: 0, y: 22 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.55, delay: 0.36 }"
        >
            <UPageSection :ui="{ container: 'max-w-5xl pt-8' }">
                <template #body>
                    <div
                        class="flex flex-col gap-5 border-t border-accented pt-8 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <p class="text-xl font-medium">Have something thoughtful in mind?</p>
                            <p class="mt-1 text-muted">
                                I’m always happy to talk about interesting work.
                            </p>
                        </div>
                        <UButton
                            to="mailto:hassanak813@outlook.com"
                            label="Get in touch"
                            trailing-icon="lucide-arrow-up-right"
                            size="lg"
                        />
                    </div>
                </template>
            </UPageSection>
        </Motion>
    </div>
</template>
