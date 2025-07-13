// stores/useLandStore.ts
import { create } from 'zustand';
import { type Land } from '~/library/interface';

type LandStore = {
  lands: Land[];
  setLands: (lands: Land[]) => void;
  addLand: (land: Land) => void;
  updateLand: (index: number, land: Land) => void;
  removeLand: (index: number) => void;
  clearLands: () => void;
};

export const useLandStore = create<LandStore>((set) => ({
  lands: [],
  setLands: (lands) => set({ lands }),
  addLand: (land) =>
    set((state) => ({
      lands: [...state.lands, land],
    })),
  updateLand: (index, land) =>
    set((state) => {
      const updated = [...state.lands];
      updated[index] = land;
      return { lands: updated };
    }),
  removeLand: (index) =>
    set((state) => {
      const updated = [...state.lands];
      updated.splice(index, 1);
      return { lands: updated };
    }),
  clearLands: () => set({ lands: [] }),
}));
