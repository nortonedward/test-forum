const STORAGE_KEY = 'test-forum:user-profile';

export interface UserProfile {
  name: string;
  avatar?: string;
}

const defaultProfile: UserProfile = {
  name: 'you',
};

function loadProfile(): UserProfile {
  if (import.meta.server) return defaultProfile;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    return {
      name: parsed.name ?? defaultProfile.name,
      avatar: parsed.avatar,
    };
  } catch {
    return defaultProfile;
  }
}

function saveProfile(profile: UserProfile) {
  if (import.meta.server) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage full or disabled
  }
}

export function useUserProfile() {
  const profile = useState<UserProfile>('user-profile', () => defaultProfile);

  onMounted(() => {
    profile.value = loadProfile();
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    profile.value = { ...profile.value, ...updates };
    saveProfile(profile.value);
  };

  const setAvatar = (avatar: string | undefined) => {
    updateProfile({ avatar });
  };

  const setName = (name: string) => {
    updateProfile({ name: name.trim() || defaultProfile.name });
  };

  const clearAvatar = () => {
    updateProfile({ avatar: undefined });
  };

  return {
    profile: readonly(profile),
    updateProfile,
    setAvatar,
    setName,
    clearAvatar,
  };
}
