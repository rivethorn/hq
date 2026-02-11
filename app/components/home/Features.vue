<script setup lang="ts">
interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Web Development",
    description:
      "Crafting responsive and performant web applications with modern technologies. I focus on clean code, smooth user experiences, and scalable solutions tailored to your needs.",
    icon: "i-lucide-code",
  },
  {
    title: "CLI Applications",
    description:
      "Building efficient, powerful command-line tools for automation, productivity, and custom workflows. Designed to be fast, reliable, and developer-friendly.",
    icon: "i-lucide-terminal",
  },
];
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 16 }"
    :in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.4 }"
    :in-view-options="{ once: true }"
    class="text-3xl font-black mb-8"
    >My Services</Motion
  >
  <div class="grid md:grid-cols-2 gap-4 mb-24">
    <Motion
      v-for="(feature, index) in features"
      :key="feature.title"
      :initial="{ opacity: 0, y: 16 }"
      :in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, delay: index * 0.05 }"
      :in-view-options="{ once: true }"
    >
      <UPageCard
        :title="feature.title"
        :description="feature.description"
        :icon="feature.icon"
        spotlight
        variant="subtle"
        class="bg-accented"
        :ui="{
          title: 'mb-4',
          leadingIcon: 'size-6',
        }"
      />
    </Motion>
  </div>
</template>
