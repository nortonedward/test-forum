/**
 * Sample avatar URLs for personalization.
 * Uses Picsum (no API key) and a few Unsplash direct URLs (hotlinking allowed with attribution).
 */
export const SAMPLE_AVATARS = [
  'https://picsum.photos/seed/avatar1/200/200',
  'https://picsum.photos/seed/avatar2/200/200',
  'https://picsum.photos/seed/avatar3/200/200',
  'https://picsum.photos/seed/avatar4/200/200',
  'https://picsum.photos/seed/avatar5/200/200',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
] as const;

export function getRandomSampleAvatar(): string {
  const i = Math.floor(Math.random() * SAMPLE_AVATARS.length);
  return SAMPLE_AVATARS[i];
}
