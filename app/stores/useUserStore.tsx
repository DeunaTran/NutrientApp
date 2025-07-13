// stores/useUserStore.ts
import { create } from 'zustand'
import type { UserProfile, SupabaseUserLite } from '~/library/interface'
type UserStore = {
  user: SupabaseUserLite | null
  profile: UserProfile | null
  setUser: (user: SupabaseUserLite) => void
  setProfile: (profile: UserProfile) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  profile: null,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  clearUser: () => set({ user: null, profile: null }),
}))
