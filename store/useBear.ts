import { create } from "zustand";

type BearState = {
  bears: number;
};

type BearActions = {
  incrementBear: () => void;
  decrementBear: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
};

export const useStore = create<BearState & BearActions>()((set) => ({
  bears: 0,
  incrementBear: () => set((state) => ({ bears: state.bears + 1 })),
  decrementBear: () => set((state) => ({ bears: state.bears - 1 })),
  removeAllBears: () => set(() => ({ bears: 0 })),
  updateBears: (newBears: number) => set(() => ({ bears: newBears })),
}));

// We can also use hooks like below

export const incrementBear = () =>
  useStore.setState((state) => ({ bears: state.bears + 1 }));

export const decrementBear = () =>
  useStore.setState((state) => ({ bears: state.bears - 1 }));

export const removeAllBears = () => useStore.setState(() => ({ bears: 0 }));

export const updateBears = (newBears: number) =>
  useStore.setState(() => ({ bears: newBears }));
