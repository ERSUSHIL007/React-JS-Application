import { create } from "zustand";

type CounterStore = {
  count: number;
  increment: () => void;

  //Create Function to Handle Async Operations Like API
  incrementAsync: () => Promise<void>;

  decrement: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => {
    set((state) => ({ count: state.count + 1 }));
  },

  //Configure Async Increment Funtion
  incrementAsync: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ count: state.count + 1 }));
  },

  decrement: () => {
    set((state) => ({ count: state.count - 1 }));
  },
}));
