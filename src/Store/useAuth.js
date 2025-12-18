import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuth = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLogged: false,
      setUser: (data) => set({ user: data }),
      signup: (userData, authToken) =>
        set({ user: userData, token: authToken }),
      login: (userData, authToken) =>
        set({ user: userData, token: authToken, isLogged: true }),
      logout: () => set({ user: null, token: null, isLogged: false }),
    }),
    {
      name: "user-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
