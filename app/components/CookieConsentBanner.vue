<script setup lang="ts">
const consent = ref<"accepted" | undefined>();
const hydrated = ref(false);

onMounted(() => {
  try {
    const stored = localStorage.getItem("hq-cookie-consent");
    if (stored === "accepted") {
      consent.value = "accepted";
    }
  } catch {
    // localStorage might be unavailable (e.g., in private mode); fail open
  } finally {
    hydrated.value = true;
  }
});

const isVisible = computed(() => consent.value !== "accepted");

const accept = () => {
  consent.value = "accepted";

  try {
    localStorage.setItem("hq-cookie-consent", "accepted");
  } catch {
    // Ignore storage errors; consent is still applied in-memory
  }
};
</script>

<template>
  <Transition
    appear
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-3 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-3 scale-95"
  >
    <div
      v-if="hydrated && isVisible"
      class="fixed right-4 bottom-4 ml-4 z-50 flex justify-center pointer-events-none"
    >
      <div
        class="pointer-events-auto mx-4 max-w-80 rounded-xl border border-muted bg-default/60 shadow-lg backdrop-blur px-4 py-3 flex flex-col gap-3 text-xs sm:text-sm text-default"
      >
        <p class="leading-relaxed">
          This site uses small cookies to remember your preferences (like theme
          and settings). By continuing to browse, you consent to this.
        </p>

        <div class="flex justify-end gap-2">
          <UButton
            color="neutral"
            variant="subtle"
            class="px-3"
            @click="accept"
          >
            Okay
          </UButton>
        </div>
      </div>
    </div>
  </Transition>
</template>
