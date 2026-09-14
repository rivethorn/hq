<script setup lang="ts">
const {
    data: projects,
    error,
    pending,
} = await useAsyncData("projects-all", () =>
    queryCollection("projects").order("date", "DESC").all(),
);

if (error.value) throw createError({ statusCode: 404 });
</script>

<template>
    <div class="py-28 sm:py-36">
        <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.3 }"
        >
            <UPageHeader
                title="Projects"
                description="A collection of tools, experiments, and useful things I’ve built."
                :ui="{
                    root: 'max-w-2xl p-0',
                    title: 'text-5xl font-semibold tracking-[-0.04em] sm:text-7xl',
                    description: 'text-lg leading-relaxed text-muted sm:text-xl',
                }"
            />
        </Motion>
        <div v-if="pending" class="mt-20 text-muted">Loading projects…</div>
        <div v-else class="mt-20 w-full divide-y divide-accented border-b border-accented">
            <Motion
                v-for="(project, index) in projects"
                :key="project.title"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: index * 0.05 }"
                class="group py-7 transition-colors hover:bg-elevated/40"
                :class="{ 'border-t border-accented': index === 0 }"
            >
                <div
                    class="grid gap-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-start sm:gap-8"
                >
                    <span class="text-sm tabular-nums text-muted">{{
                        new Date(project.date).getFullYear()
                    }}</span>
                    <div class="max-w-2xl">
                        <h2 class="text-xl font-bold tracking-tight flex items-center gap-1">
                            {{ project.title }}
                            <span v-if="project.stack">·</span>
                            <span class="text-base text-muted font-medium">{{
                                project.stack
                            }}</span>
                        </h2>
                        <p class="mt-2 leading-relaxed text-muted">
                            {{ project.description }}
                        </p>
                    </div>
                    <div class="flex gap-2 sm:justify-end">
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
    </div>
</template>
