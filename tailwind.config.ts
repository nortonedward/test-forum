import type { Config } from 'tailwindcss';
import { uiTailwindPreset } from '@cursor-run/ui/tailwind.preset';

export default {
  presets: [uiTailwindPreset as Config],
  content: ['./app/**/*.{vue,js,ts}', '../test-run/packages/ui/src/**/*.{vue,js,ts}'],
  plugins: [],
} satisfies Config;
