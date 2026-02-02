<template>
  <div class="mx-auto max-w-3xl space-y-8 pb-24">
    <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
      <Icon name="lucide:arrow-left" class="size-4" aria-hidden />
      Back to feed
    </NuxtLink>

    <!-- Journal entry (POC — full view) -->
    <UiCard class="p-8 sm:p-12">
      <header class="mb-8 space-y-4">
        <span class="bg-primary-accent/50 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-foreground">
          <Icon name="lucide:type" class="size-4" aria-hidden />
          Journal entry
        </span>
        <div class="flex flex-wrap items-baseline gap-3">
          <h1 class="text-2xl font-bold text-foreground sm:text-3xl">Snippet detail</h1>
          <span class="text-muted">{{ id }}</span>
        </div>
        <p class="text-sm text-muted">This is where a full journal entry would live — expanded content, comments, related snippets, drawings, etc.</p>
      </header>

      <!-- Placeholder content -->
      <div class="border-border/60 bg-muted/5 rounded-lg border-2 border-dashed p-12 text-center">
        <Icon name="lucide:book-open" class="text-muted/50 mx-auto mb-4 size-12" aria-hidden />
        <p class="text-muted">Journal view coming soon — your thoughts, sketches, and collections in one place.</p>
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id as string);
</script>
