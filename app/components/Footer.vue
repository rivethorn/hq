<template>
    <UFooter class="py-1 lg:pb-4 lg:pt-2">
        <template #left>
            <div class="flex items-center gap-3">
                <NuxtImg src="/logo.svg" alt="" class="size-6 dark:invert" />
                <span class="text-xs font-semibold tracking-tight">Rivethorn’s HQ</span>
            </div>
        </template>

        <template #default>
            <nav class="flex items-center gap-1" aria-label="Footer navigation">
                <UButton to="/" label="Home" variant="link" color="neutral" size="sm" />
                <UButton to="/projects" label="Projects" variant="link" color="neutral" size="sm" />
                <UButton to="/writings" label="Writings" variant="link" color="neutral" size="sm" />
            </nav>
        </template>

        <template #right>
            <div class="flex items-center gap-3">
                <span class="text-xs text-muted"
                    >© {{ new Date().getFullYear() }} Hassan Qasemi</span
                >
            </div>
        </template>
    </UFooter>
</template>
