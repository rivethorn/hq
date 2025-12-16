<template>
    <USeparator />
    <UFooter>
        <template #left>
            <p class="text-muted text-sm">
                {{ new Date().getFullYear() }} Hassan Qasemi.
            </p>
        </template>

        <template #right>
            <span class=" text-xs text-center text-muted leading-relaxed">
                This website is fully open-source, you can find the source
                code on<NuxtLink to="https://github.com/rivethorn/hq" class="underline mx-1">GitHub</NuxtLink>
            </span>
        </template>
    </UFooter>
</template>
