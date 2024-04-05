import { create } from "zustand";
interface User {
  name: string;
  userName: string;
  email: string;
  _id: string;
  role: "teacher" | "student";
}
interface UserState {
  userProfile: User;
  updatedUsers: boolean;
  setUser: (userProfile: User | {}) => void;
  setUpdateUsers: () => void;
}
export const useUserIdStore = create<UserState>((set) => ({
  userProfile: {} as User,
  updatedUsers: false,

  setUser: (userProfile: User | {}) =>
    set({
      userProfile: userProfile as User,
    }),
  setUpdateUsers: () => {
    set((state) => ({
      updatedUsers: !state.updatedUsers,
    }));
  },
}));
