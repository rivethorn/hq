<template>
  <Motion
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5, delay: 0.2 }"
    class="mx-auto w-full h-full mb-28"
  >
    <UContainer class="py-2">
      <div class="max-w-2xl mx-auto space-y-12">
        <div class="border border-accented rounded-xl h-fit">
          <div class="border-b border-accented flex items-center">
            <div class="flex gap-2 mx-2 my-2.5">
              <div class="size-3 rounded-full bg-red-500/85" />
              <div class="size-3 rounded-full bg-yellow-500/85" />
              <div class="size-3 rounded-full bg-green-500/85" />
            </div>
            <span class="text-muted text-sm font-bold">
              rivethorn — stack.config.ts ~ —
            </span>
          </div>
          <div
            class="space-y-1 font-mono text-sm lg:text-base font-semibold overflow-x-auto px-5 py-6 bg-[#f5f3f0] dark:bg-[#232326]"
          >
            <div class="flex gap-2 whitespace-nowrap">
              <!-- <span class="mr-6 text-[#5a4a3a] dark:text-[#d4be98] opacity-80"
                >1</span
              > -->
              <span class="text-[#8b4c4a] dark:text-[#a96b69]">const</span>
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">hassan</span>
              <span class="text-[#8b4c4a] dark:text-[#a96b69]">=</span>
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">{</span>
            </div>
            <div class="flex gap-1 whitespace-nowrap">
              <!-- <span class="mr-12 text-[#5a4a3a] dark:text-[#d4be98] opacity-80"
                >2</span
              > -->
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">frontend:</span>
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">[</span>
              <span class="text-[#6b8860] dark:text-[#89a87d]">"Nuxt"</span>,
              <span class="text-[#6b8860] dark:text-[#89a87d]">"Next.js"</span>,
              <span class="text-[#6b8860] dark:text-[#89a87d]">
                "TypeScript"
              </span>
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">]</span>,
            </div>
            <div class="flex gap-1 whitespace-nowrap">
              <!-- <span class="mr-12 text-[#5a4a3a] dark:text-[#d4be98] opacity-80"
                >3</span
              > -->
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">backend:</span>
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">[</span>
              <span class="text-[#6b8860] dark:text-[#89a87d]">"Bun"</span>,
              <span class="text-[#6b8860] dark:text-[#89a87d]">"Node"</span>,
              <span class="text-[#6b8860] dark:text-[#89a87d]"> "Python" </span
              >,
              <span class="text-[#6b8860] dark:text-[#89a87d]"> "Go" </span>
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">]</span>,
            </div>
            <div class="flex gap-1 whitespace-nowrap">
              <!-- <span class="mr-12 text-[#5a4a3a] dark:text-[#d4be98] opacity-80"
                >4</span
              > -->
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">database:</span>
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">[</span>
              <span class="text-[#6b8860] dark:text-[#89a87d]"
                >"PostgreSQL"</span
              >,
              <span class="text-[#6b8860] dark:text-[#89a87d]">"Supabase"</span>
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">]</span>,
            </div>
            <div class="flex gap-1 whitespace-nowrap">
              <!-- <span class="mr-12 text-[#5a4a3a] dark:text-[#d4be98] opacity-80"
                >5</span
              > -->
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">systems:</span>
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">[</span>
              <span class="text-[#6b8860] dark:text-[#89a87d]">"Rust"</span>,
              <span class="text-[#6b8860] dark:text-[#89a87d]">"Linux"</span>
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">]</span>,
            </div>
            <div class="flex gap-2 whitespace-nowrap">
              <!-- <span class="mr-11 text-[#5a4a3a] dark:text-[#d4be98] opacity-80"
                >6</span
              > -->
              <span class="text-[#5a4a3a] dark:text-[#d4be98]">}</span>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </Motion>
</template>
