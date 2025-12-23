<template>
    <USeparator />
    <UFooter class="pb-10 lg:pb-20 pt-2">
        <template #left>
            <ColorThemeTab />
        </template>

        <template #right>
            <span class=" text-xs text-center text-muted leading-relaxed">
                This website is fully open-source, you can find the source
                code on<NuxtLink to="https://github.com/rivethorn/hq" class="underline mx-1">GitHub</NuxtLink>
            </span>
        </template>
    </UFooter>

    <div class="flex justify-center">
        <NuxtImg src="/text.svg" class="w-[92%] lg:w-5xl light:invert" />
    </div>
</template>
