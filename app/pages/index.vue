<script setup lang="ts">

const supabase = useSupabaseClient();

interface Metadata {
    title: string;
    created_at: string;
    tag: string;
    time_to_read: string;
    slug: string;
    summary: string;
}

const files = ref<Array<{ name: string; url: string }>>([]);
const meta = ref<
    Array<Metadata>
>([]);
const loading = ref(true);

async function loadFiles() {
    const { data, error } = await supabase.storage
        .from("blog")
        .list("", { limit: 100, sortBy: { column: "name", order: "asc" } });

    if (error) {
        console.error(error);
        return;
    }

    files.value = data
        .filter((file) => file.name.endsWith(".md")) // Only .md files
        .map((file) => ({
            name: file.name.replace(".md", ""), // Display name without extension
            url: supabase.storage.from("blog").getPublicUrl(file.name).data.publicUrl,
            // For private bucket: use createSignedUrl(file.name, 3600) and store signed URL
        }));

    loading.value = false;
}

async function loadMeta() {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
        console.error(error);
        return;
    }

    console.log(data);

    meta.value = data.map((file: Metadata) => ({
        title: file.title,
        tag: file.tag,
        created_at: file.created_at,
        time_to_read: file.time_to_read,
        slug: file.slug,
        summary: file.summary,
    }));
}
onMounted(() => {
    loadMeta();
    loadFiles();
});
</script>

<template>
    <div class="flex flex-col items-start justify-center gap-10">
        <h1 class="text-5xl font-black">Thoughts & Essays</h1>
        <h3 class="text-xl font-medium text-muted">
            Writing about technology, programming, and the intersection of creativity
            and engineering.
        </h3>

        <div v-if="!loading" class="-mt-8">
            <NuxtLink v-for="file in meta" :key="file.slug" :to="`/writings/${file.slug}`"
                class="group flex flex-col gap-3.5 my-16">
                <CrossedDiv class-name="p-8 h-full flex flex-col gap-3.5">
                    <div class="flex gap-3 text-muted">
                        <span>{{ new Date(file.created_at).toDateString() }}</span>
                        <span>·</span>
                        <span>{{ file.time_to_read }}</span>
                        <span>·</span>
                        <span>{{ file.tag }}</span>
                    </div>
                    <span class="text-3xl font-bold transition-all">{{ file.title }}</span>
                    <span class="text-muted text-xl ">{{ file.summary }}</span>
                    <div class="flex items-center gap-2 group-hover:gap-4 transition-all">
                        <span class="group-hover:text-muted">Read more</span>
                        <UIcon name="lucide-arrow-right" class="size-5 group-hover:size-6" />
                    </div>
                </CrossedDiv>
            </NuxtLink>
        </div>

        <p v-else>Loading...</p>
    </div>
</template>
