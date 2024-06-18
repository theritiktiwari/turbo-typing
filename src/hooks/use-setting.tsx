import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";

interface SettingStore {
  difficulty: string | null;
  updateDifficulty: (data: string) => void;
  removeDifficulty: () => void;
  removeAll: () => void;
}

export const useSetting = create(
  persist<SettingStore>((set, get) => ({
    difficulty: null,
    updateDifficulty: (data: string) => {
      const diff = get().difficulty;
      if (diff === data) return;
      set({ difficulty: data });
    },
    removeDifficulty: () => set({ difficulty: null }),
    removeAll: () => set({ difficulty: null }),
  }), {
    name: 'setting-storage',
    storage: createJSONStorage(() => localStorage)
  }));
