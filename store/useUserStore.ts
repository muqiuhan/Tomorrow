import * as Zustand from "zustand";
import * as ZustandMiddleware from "zustand/middleware";
import * as Supabase from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserStore {
  user: Supabase.User | null;
  session: Supabase.Session | null;
  setSession: (session: Supabase.Session | null) => void;
  setUser: (user: Supabase.User | null) => void;
  isLoggedIn: Boolean;
  setIsLoggedIn: (isLoggedIn: Boolean) => void;
}

export const useUserStore = Zustand.create(
  ZustandMiddleware.persist<UserStore>(
    (set) => ({
      user: null,
      session: null,
      isLoggedIn: false,
      isOnboarded: false,
      setUser: (user: Supabase.User | null) => set((state) => ({ user })),
      setSession: (session: Supabase.Session | null) =>
        set((state) => ({ session })),
      setIsLoggedIn: (isLoggedIn: Boolean) => set((state) => ({ isLoggedIn })),
    }),
    {
      name: "tomorrow-user-store",
      storage: ZustandMiddleware.createJSONStorage(() => AsyncStorage),
    }
  )
);
