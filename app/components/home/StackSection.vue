<script setup lang="ts">
const md = `
\`\`\`ts [stack.config.ts]
const hassan = {
  frontend: ["Nuxt", "Next.js", "TypeScript"],
  backend: ["Bun", "Node", "Python", "Go" ],
  database: ["PostgreSQL", "Supabase"],
  systems: ["Rust", "Linux"],
}
\`\`\`
`;
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5, delay: 0.2 }"
    class="mx-auto w-full h-full"
  >
    <UContainer class="py-2">
      <div class="max-w-3xl mx-auto space-y-12">
        <MDC :value="md" />
      </div>
    </UContainer>
  </Motion>
</template>
