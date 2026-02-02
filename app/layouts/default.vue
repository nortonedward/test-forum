<template>
  <div class="flex min-h-screen flex-col">
    <header
      class="border-primary/15 bg-surface/95 dark:border-primary/25 flex items-center justify-between border-b-2 px-4 py-3 shadow-header backdrop-blur-sm dark:shadow-header-dark sm:px-6"
    >
      <NuxtLink to="/" class="text-lg font-semibold text-foreground">
        {{ siteName }}
      </NuxtLink>
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/account"
          class="hover:bg-muted/20 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          aria-label="Account settings"
        >
          <UiAvatar :name="profile.name" :src="profile.avatar" size="sm" />
          <span class="hidden sm:inline">Account</span>
        </NuxtLink>
        <UiButton variant="secondary" size="sm" class="p-2.5" aria-label="Toggle dark mode" @click="toggle">
          <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="size-5" aria-hidden />
        </UiButton>
      </div>
    </header>
    <main class="flex-1 px-4 py-8 sm:px-8 sm:py-12">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const siteName = 'New Forum';
const { isDark, toggle } = useDarkMode();
const { profile } = useUserProfile();
</script>
