import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useSearch = create(
  persist(
    (set) => ({
      search: "",
      setSearch: (value) => set({ search: value }),
      clearSearch: () => set({ search: "" }),
    }),
    {
      name: "search",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSearch;
