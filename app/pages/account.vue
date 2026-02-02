<template>
  <div class="mx-auto max-w-2xl space-y-12 pb-24">
    <header>
      <UiHeading :level="1" muted="Customize your profile and preferences."> Account </UiHeading>
    </header>

    <!-- Profile: avatar + name -->
    <UiCard class="space-y-8 p-6 sm:p-8">
      <h2 class="text-lg font-semibold text-foreground">Profile</h2>

      <div class="space-y-8">
        <div>
          <label for="profile-name" class="mb-2 block text-sm font-medium text-foreground"> Display name </label>
          <UiInput id="profile-name" v-model="nameValue" placeholder="Your name" class="max-w-xs" @blur="handleNameBlur" />
        </div>

        <div>
          <p class="mb-3 text-sm font-medium text-foreground">Avatar</p>
          <UiImagePicker
            v-model="avatarValue"
            :sources="['upload', 'url', 'samples']"
            :samples="SAMPLE_AVATARS_ARRAY"
            aspect="square"
            preview-shape="circle"
            :max-size="512 * 1024"
            :max-dimension="128"
            @error="uploadError = $event"
          />
          <p class="mt-2 text-xs text-muted">Upload, paste a URL, or pick a sample. Max 512KB, resized for avatar.</p>
        </div>
      </div>

      <UiAlert v-if="uploadError" variant="error" class="mt-4">
        {{ uploadError }}
      </UiAlert>

      <div class="flex gap-4 pt-4">
        <UiButton variant="secondary" size="sm" @click="handleClearAvatar"> Remove avatar </UiButton>
      </div>
    </UiCard>

    <!-- Preview -->
    <UiCard class="p-6 sm:p-8">
      <h2 class="mb-6 text-lg font-semibold text-foreground">Preview</h2>
      <div class="flex items-center gap-4">
        <UiAuthor :name="profile.name" subtitle="Your profile" :avatar="profile.avatar" size="lg" />
      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { SAMPLE_AVATARS } from '~/utils/sampleImages';

const { profile, setAvatar, setName } = useUserProfile();

// SAMPLE_AVATARS is readonly; UiImagePicker expects string[]
const SAMPLE_AVATARS_ARRAY = [...SAMPLE_AVATARS] as string[];

const nameValue = ref(profile.value.name);
const avatarValue = ref(profile.value.avatar ?? '');
const uploadError = ref('');

watch(avatarValue, (v) => setAvatar(v || undefined), { immediate: true });

watch(
  () => profile.value,
  (p) => {
    nameValue.value = p.name;
    avatarValue.value = p.avatar ?? '';
  },
  { immediate: true },
);

const handleNameBlur = () => {
  setName(nameValue.value);
  nameValue.value = profile.value.name;
};

const handleClearAvatar = () => {
  avatarValue.value = '';
};
</script>
