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
  <UContainer class="py-2">
    <div class="max-w-3xl mx-auto space-y-12">
      <MDC :value="md" />
    </div>
  </UContainer>
</template>
