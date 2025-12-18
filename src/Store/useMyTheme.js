import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useMyTheme = create(
  persist(
    (set, get) => ({
      darkMode: false,
      toggleTheme: () => set({ darkMode: !get().darkMode }),
    }),
    {
      name: "dark-theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMyTheme;
