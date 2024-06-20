import { Toast } from '@/components/ui/toast';
import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";

export interface SettingStore {
  time: number;
  updateTime: (data: number) => void;
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
    time: 15,
    updateTime: (data: number) => {
      const { time } = get();
      if (time === data) return;
      set({ time: data });
    },
    difficulty: "beginner",
    updateDifficulty: (data: string) => {
      const { difficulty } = get();
      if (difficulty === data) return;
      set({ difficulty: data });
    },
    language: "english",
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
    fontSize: "30",
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

        if (!details.time || !details.difficulty || !details.language || !details.unit || !details.fontSize || !details.fontFamily) {
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
        time: 15,
        difficulty: "beginner",
        language: "english",
        unit: "WPM",
        fontSize: "30",
        fontFamily: "Source Code Pro",
      });
      Toast({ success: true, message: "Settings reset to default." })
    },
  }), {
    name: 'setting-storage',
    storage: createJSONStorage(() => localStorage)
  }));
