import { create } from "zustand";

type State = {
    userAddress: string;
};
type Action = {
    setAddress: (address: State["userAddress"]) => void;
};

export const useProfileStore = create<State & Action>((set) => ({
    userAddress: "",
    setAddress: (address: string) => set({ userAddress: address }),
}));
