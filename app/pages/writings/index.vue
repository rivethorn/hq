<script setup lang="ts">
const {
    data: posts,
    error,
    pending,
} = await useAsyncData("posts-all", () => queryCollection("writing").order("date", "DESC").all());

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
                title="Writings"
                description="Notes on building, learning, and changing direction."
                :ui="{
                    root: 'max-w-2xl p-0',
                    title: 'text-5xl font-semibold tracking-[-0.04em] sm:text-7xl',
                    description: 'text-lg leading-relaxed text-muted sm:text-xl',
                }"
            />
        </Motion>
        <div v-if="pending" class="mt-20 text-muted">Loading posts…</div>
        <div v-else class="mt-20 w-full divide-y divide-accented border-b border-accented">
            <Motion
                v-for="(post, index) in posts"
                :key="post.title"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: index * 0.05 }"
                :class="{ 'border-t border-accented': index === 0 }"
            >
                <NuxtLink
                    :to="post.path"
                    class="group relative block py-8 pr-10 transition-colors hover:bg-elevated/40"
                    :aria-label="`Read ${post.title}`"
                    :style="{ '--stagger': index }"
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
    </div>
</template>
