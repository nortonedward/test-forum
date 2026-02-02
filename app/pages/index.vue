<template>
  <div class="mx-auto max-w-4xl space-y-16 pb-16">
    <section>
      <UiHeading :level="1" muted="Community discussions, powered by the design system.">
        New Forum
      </UiHeading>
      <p class="mt-4 max-w-2xl text-lg text-muted">
        A modern forum built with Nuxt 4 and the shared component library. Toggle dark mode in the header.
      </p>
    </section>

    <section>
      <UiHeading :level="2" muted="UiSelect — single and multi" class="mb-6"> select </UiHeading>
      <div class="flex flex-col gap-8 sm:flex-row sm:flex-wrap">
        <div class="min-w-0 flex-1 sm:max-w-xs">
          <p class="mb-2 text-sm text-muted">Single</p>
          <UiSelect
            v-model="form.topic"
            :items="topicItems"
            placeholder="Select topic…"
          />
        </div>
        <div class="min-w-0 flex-1 sm:max-w-xs">
          <p class="mb-2 text-sm text-muted">Multiple selection</p>
          <UiSelect
            v-model="form.topics"
            :items="topicItems"
            :multiple="true"
            placeholder="Choose one or more…"
          />
        </div>
      </div>
    </section>

    <section>
      <UiHeading :level="2" muted="UiAlert — semantic variants" class="mb-6"> alerts </UiHeading>
      <div class="space-y-4">
        <UiAlert variant="success">Welcome! Your account has been created successfully.</UiAlert>
        <UiAlert variant="info">New feature: dark mode is now available. Toggle it in the header.</UiAlert>
      </div>
    </section>

    <section>
      <UiHeading :level="2" muted="UiCard, UiButton" class="mb-6"> get started </UiHeading>
      <div class="grid gap-4 sm:grid-cols-2">
        <UiCard>
          <UiHeading :level="4" class="mb-2"> Browse topics </UiHeading>
          <p class="mb-4 text-muted">Explore discussions across categories.</p>
          <UiButton variant="primary"> Browse </UiButton>
        </UiCard>
        <UiCard>
          <UiHeading :level="4" class="mb-2"> Create a post </UiHeading>
          <p class="mb-4 text-muted">Share your thoughts with the community.</p>
          <UiButton variant="secondary"> New post </UiButton>
        </UiCard>
      </div>
    </section>

    <section>
      <UiHeading :level="2" muted="UiButton — variants" class="mb-6"> buttons </UiHeading>
      <div class="flex flex-wrap gap-4 rounded-lg border border-border bg-surface p-6 shadow-card">
        <UiButton variant="primary"> primary </UiButton>
        <UiButton variant="secondary"> secondary </UiButton>
        <UiButton variant="ghost"> ghost </UiButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  topic: '',
  topics: [] as string[],
});

const topicItems = [
  { value: 'general', label: 'General' },
  { value: 'support', label: 'Support' },
  { value: 'feedback', label: 'Feedback' },
];
</script>
