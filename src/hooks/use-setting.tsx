import { Toast } from '@/components/ui/toast';
import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";

interface SettingStore {
  difficulty: string;
  updateDifficulty: (data: string) => void;
  language: string;
  updateLanguage: (data: string) => void;
  unit: string;
  updateUnit: (data: string) => void;
  fontSize: string;
  updateFontSize: (data: string) => void;
  fontFamily: string;
  updateFontFamily: (data: string) => void;
  import: (data: string) => void;
  export: () => void;
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
    unit: "WPM",
    updateUnit: (data: string) => {
      const { unit } = get();
      if (unit === data) return;
      set({ unit: data });
    },
    fontSize: "12",
    updateFontSize: (data: string) => {
      const { fontSize } = get();
      if (fontSize === data) return;
      set({ fontSize: data });
    },
    fontFamily: "Source Code Pro",
    updateFontFamily: (data: string) => {
      const { fontFamily } = get();
      if (fontFamily === data) return;
      set({ fontFamily: data });
    },
    import: (data: string) => {
      try {
        const details = JSON.parse(data);

        if (!details.difficulty || !details.language || !details.unit || !details.fontSize || !details.fontFamily) {
          return Toast({ success: false, message: "Invalid settings data." })
        }

        set(details);
        Toast({ success: true, message: "Settings imported." })
      } catch (error) {
        Toast({ success: false, message: "Invalid settings data." })
      }
    },
    export: () => {
      const details = get();
      return details;
    },
    reset: () => {
      set({
        difficulty: "BEGINNER",
        language: "ENGLISH",
        unit: "WPM",
        fontSize: "12",
        fontFamily: "Source Code Pro",
      });
      Toast({ success: true, message: "Settings reset to default." })
    },
  }), {
    name: 'setting-storage',
    storage: createJSONStorage(() => localStorage)
  }));
