<script setup lang="ts">
const route = useRoute();

const isVisible = ref(false);
const THRESHOLD = 50;

const handleScroll = () => {
    isVisible.value = window.scrollY > THRESHOLD;
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    history.replaceState(
        null,
        '',
        `${route.path}`
    );
};

onMounted(() => {
    handleScroll(); // sync initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
    <div class="fixed bottom-6 left-6 z-50">
        <Transition appear enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-3 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-3 scale-95">
            <div v-if="isVisible">
                <UButton icon="lucide-chevron-up" aria-label="Scroll to top" size="lg" color="neutral" variant="subtle"
                    class="rounded-full shadow-lg hover:shadow-xl transition-transform hover:-translate-y-0.5"
                    @click="scrollToTop" />
            </div>
        </Transition>
    </div>
</template>