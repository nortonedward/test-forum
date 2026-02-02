<template>
  <div class="mx-auto flex max-w-6xl gap-8 pb-24 lg:gap-12">
    <!-- Sidebar: Journal sections (POC — future filters) — desktop -->
    <aside class="hidden shrink-0 lg:block lg:w-52" aria-label="Journal sections">
      <nav class="sticky top-24 space-y-1">
        <p class="text-muted/70 mb-4 text-xs font-medium uppercase tracking-wider">Journal</p>
        <button
          v-for="section in journalSections"
          :key="section.id"
          type="button"
          :class="[
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-[var(--duration-normal)]',
            activeSection === section.id ? 'bg-primary-accent/50 text-foreground' : 'hover:bg-muted/20 text-muted hover:text-foreground',
          ]"
          @click="activeSection = section.id"
        >
          <Icon :name="section.icon" class="size-4 shrink-0" aria-hidden />
          {{ section.label }}
        </button>
        <div class="border-border/60 mt-8 border-t pt-6">
          <p class="text-muted/70 mb-3 text-xs font-medium uppercase tracking-wider">Coming soon</p>
          <div class="border-border/60 bg-muted/5 space-y-1 rounded-lg border border-dashed p-3">
            <p class="text-xs text-muted">Collections, tags, search</p>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main: Compose + Feed -->
    <div class="min-w-0 flex-1 space-y-12">
      <!-- Mobile: section pills (when sidebar hidden) -->
      <div class="flex gap-2 overflow-x-auto pb-2 lg:hidden" role="tablist">
        <button
          v-for="section in journalSections"
          :key="section.id"
          type="button"
          :class="[
            'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
            activeSection === section.id ? 'bg-primary-accent/50 text-foreground' : 'bg-muted/20 hover:bg-muted/30 text-muted hover:text-foreground',
          ]"
          @click="activeSection = section.id"
        >
          {{ section.label }}
        </button>
      </div>

      <!-- Compose: personalized with avatar -->
      <section
        class="border-border/60 bg-surface/80 hover:bg-surface/95 rounded-xl border py-4 transition-colors duration-[var(--duration-normal)] hover:border-border sm:py-5"
        aria-label="Compose snippet"
      >
        <div class="space-y-4 px-4 sm:px-6">
          <UiComposeBar>
            <template #avatar>
              <UiAvatar :name="profile.name" :src="profile.avatar" size="md" />
            </template>
            <UiInput
              v-model="newSnippet"
              placeholder="Share a snippet — text, idea, sketch…"
              class="border-border/80 bg-background/50 min-h-[2.75rem]"
            />
            <template #actions>
              <UiButton
                variant="ghost"
                size="sm"
                :class="[newSnippetImage ? 'text-accent' : 'text-muted hover:text-foreground']"
                aria-label="Attach image"
                @click="showImagePicker = !showImagePicker"
              >
                <Icon name="lucide:image-plus" class="size-4" aria-hidden />
              </UiButton>
              <UiButton variant="primary" :disabled="!newSnippet.trim()" @click="postSnippet"> Post </UiButton>
            </template>
          </UiComposeBar>

          <!-- Image picker (upload + URL, 5MB for snippet content) -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            leave-active-class="transition duration-150 ease-in"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="showImagePicker" class="border-border/60 rounded-lg border bg-muted/5 p-4">
              <div class="mb-3 flex items-center justify-between">
                <span class="text-sm font-medium text-foreground">Attach image</span>
                <UiButton
                  v-if="newSnippetImage"
                  variant="ghost"
                  size="sm"
                  class="text-muted hover:text-foreground"
                  @click="newSnippetImage = ''"
                >
                  Remove
                </UiButton>
              </div>
              <UiImagePicker
                v-model="newSnippetImage"
                :sources="['upload', 'url']"
                aspect="wide"
                :max-size="5 * 1024 * 1024"
                class="max-w-md"
                @error="imagePickerError = $event"
              />
              <p class="mt-2 text-xs text-muted">Max 5MB. Upload or paste a URL.</p>
              <UiAlert v-if="imagePickerError" variant="error" class="mt-3">
                {{ imagePickerError }}
              </UiAlert>
            </div>
          </Transition>
        </div>
      </section>

      <!-- Feed: grid with varied cards -->
      <div class="space-y-10">
        <!-- Date separator (POC — future grouping) -->
        <div class="flex items-center gap-4" aria-hidden>
          <span class="text-muted/70 text-xs font-medium uppercase tracking-wider"> Today </span>
          <div class="bg-border/50 h-px flex-1" />
        </div>

        <div class="grid gap-6 sm:gap-8 lg:grid-cols-2" role="feed" aria-label="Snippet feed">
          <UiCard
            v-for="(snippet, i) in filteredSnippets"
            :key="snippet.id"
            :class="[
              'group relative overflow-hidden p-6 transition-all duration-[var(--duration-normal)] sm:p-8',
              snippet.spanFull ? 'lg:col-span-2' : '',
            ]"
            role="article"
            :aria-label="`Snippet by ${snippet.author}`"
          >
            <!-- Type badge (POC — future rich content) -->
            <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span :class="['inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium', typeStyles[snippet.type].badge]">
                <Icon :name="typeStyles[snippet.type].icon" class="size-3.5" aria-hidden />
                {{ snippet.type }}
              </span>
              <UiAuthor :name="snippet.author" :subtitle="snippet.timestamp" :avatar="snippet.avatar" size="sm" />
            </div>

            <!-- Image (when snippet has image) -->
            <div
              v-if="snippet.image"
              class="mb-4 overflow-hidden rounded-lg border border-border bg-muted/10"
            >
              <img
                :src="snippet.image"
                :alt="`Image by ${snippet.author}`"
                class="aspect-video w-full object-cover"
                loading="lazy"
              />
            </div>

            <!-- Content -->
            <p class="whitespace-pre-wrap text-base leading-relaxed text-foreground sm:text-lg">
              {{ snippet.content }}
            </p>

            <!-- Actions -->
            <div class="mt-6 flex items-center gap-1 pt-4" role="group" aria-label="Snippet actions">
              <UiButton variant="ghost" size="sm" class="gap-1.5 text-muted hover:text-foreground" aria-label="Like">
                <Icon name="lucide:heart" class="size-4" aria-hidden />
                <span class="text-sm">{{ snippet.likes }}</span>
              </UiButton>
              <UiButton variant="ghost" size="sm" class="gap-1.5 text-muted hover:text-foreground" aria-label="Comment">
                <Icon name="lucide:message-circle" class="size-4" aria-hidden />
                <span class="text-sm">{{ snippet.comments }}</span>
              </UiButton>
              <UiButton variant="ghost" size="sm" class="text-muted hover:text-foreground" aria-label="Share">
                <Icon name="lucide:share-2" class="size-4" aria-hidden />
              </UiButton>
              <NuxtLink :to="`/snippet/${snippet.id}`" class="ml-auto flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
                Open journal
                <Icon name="lucide:arrow-right" class="size-4" aria-hidden />
              </NuxtLink>
            </div>
          </UiCard>
        </div>

        <!-- Yesterday separator (POC — shows future date grouping) -->
        <div v-if="filteredSnippets.length > 2" class="space-y-8">
          <div class="flex items-center gap-4" aria-hidden>
            <span class="text-muted/70 text-xs font-medium uppercase tracking-wider"> Earlier </span>
            <div class="bg-border/50 h-px flex-1" />
          </div>
          <p class="text-sm text-muted">More entries will appear here as the journal grows.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type SnippetType = 'text' | 'sketch' | 'code' | 'link' | 'collection';

interface Snippet {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  type: SnippetType;
  section: string;
  avatar?: string;
  /** Image URL or data URL attached to snippet. */
  image?: string;
  hasMedia?: boolean;
  spanFull?: boolean;
}

interface JournalSection {
  id: string;
  label: string;
  icon: string;
}

const journalSections: JournalSection[] = [
  { id: 'all', label: 'All', icon: 'lucide:layers' },
  { id: 'creative', label: 'Creative', icon: 'lucide:palette' },
  { id: 'science', label: 'Science', icon: 'lucide:microscope' },
  { id: 'anime', label: 'Anime', icon: 'lucide:sparkles' },
];

const activeSection = ref('all');

const { profile } = useUserProfile();

const typeStyles: Record<SnippetType, { badge: string; icon: string }> = {
  text: {
    badge: 'bg-primary-accent/50 text-foreground',
    icon: 'lucide:type',
  },
  sketch: {
    badge: 'bg-secondary-accent/50 text-secondary',
    icon: 'lucide:pencil',
  },
  code: {
    badge: 'bg-info-accent/50 text-info',
    icon: 'lucide:code',
  },
  link: {
    badge: 'bg-success-accent/50 text-success',
    icon: 'lucide:link',
  },
  collection: {
    badge: 'bg-warning-accent/50 text-warning',
    icon: 'lucide:folder',
  },
};

const newSnippet = ref('');
const newSnippetImage = ref('');
const showImagePicker = ref(false);
const imagePickerError = ref('');

watch(newSnippetImage, (v) => {
  if (v) imagePickerError.value = '';
});

const snippets = ref<Snippet[]>([
  {
    id: '1',
    author: 'alex',
    content: 'Just discovered this neat pattern for reactive state. Game changer for form handling.',
    timestamp: '2m ago',
    likes: 12,
    comments: 3,
    type: 'text',
    section: 'creative',
    avatar: 'https://picsum.photos/seed/alex/200/200',
  },
  {
    id: '2',
    author: 'sam',
    content: 'const useSnippet = () => ({ post: async (c) => {...}, like: (id) => {...} })',
    timestamp: '1h ago',
    likes: 8,
    comments: 1,
    type: 'code',
    section: 'creative',
    spanFull: true,
    avatar: 'https://picsum.photos/seed/sam/200/200',
  },
  {
    id: '3',
    author: 'jordan',
    content: 'Building in public: day 3 of the forum MVP. Feed is looking good.',
    timestamp: '3h ago',
    likes: 24,
    comments: 7,
    type: 'text',
    section: 'creative',
    avatar: 'https://picsum.photos/seed/jordan/200/200',
  },
  {
    id: '4',
    author: 'maya',
    content: 'Rough sketch for a new character design — will refine the linework later.',
    timestamp: '5h ago',
    likes: 31,
    comments: 12,
    type: 'sketch',
    section: 'anime',
    image: 'https://picsum.photos/seed/sketch/800/450',
    avatar: 'https://picsum.photos/seed/maya/200/200',
  },
  {
    id: '5',
    author: 'kai',
    content: 'Pressed this Monstera deliciosa today. The venation is incredible under magnification.',
    timestamp: '1d ago',
    likes: 18,
    comments: 4,
    type: 'collection',
    section: 'science',
    image: 'https://picsum.photos/seed/plant/800/450',
    avatar: 'https://picsum.photos/seed/kai/200/200',
  },
]);

const filteredSnippets = computed(() => {
  if (activeSection.value === 'all') return snippets.value;
  return snippets.value.filter((s) => s.section === activeSection.value);
});

const postSnippet = () => {
  const content = newSnippet.value.trim();
  if (!content) return;

  snippets.value.unshift({
    id: crypto.randomUUID(),
    author: profile.value.name,
    content,
    timestamp: 'now',
    likes: 0,
    comments: 0,
    type: 'text',
    section: 'creative',
    avatar: profile.value.avatar,
    image: newSnippetImage.value || undefined,
  });
  newSnippet.value = '';
  newSnippetImage.value = '';
  showImagePicker.value = false;
  imagePickerError.value = '';
};
</script>
