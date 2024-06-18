import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";

interface SettingStore {
  difficulty: string;
  updateDifficulty: (data: string) => void;
  language: string;
  updateLanguage: (data: string) => void;
  reset: () => void;
}

export const useSetting = create(
  persist<SettingStore>((set, get) => ({
    difficulty: "BEGINNER",
    updateDifficulty: (data: string) => {
      const { difficulty } = get();
      if (difficulty === data) return;
      set({ difficulty: data });
    },
    language: "ENGLISH",
    updateLanguage: (data: string) => {
      const { language } = get();
      if (language === data) return;
      set({ language: data });
    },
    reset: () => set({
      difficulty: "BEGINNER",
      language: "ENGLISH"
    }),
  }), {
    name: 'setting-storage',
    storage: createJSONStorage(() => localStorage)
  }));
