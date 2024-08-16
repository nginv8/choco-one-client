import { StateCreator } from 'zustand';

type AuthState = {
  jwt: string | null;
  rememberMe: boolean;
  setJwt: (token: string, remember: boolean) => void;
  clearJwt: () => void;
  setRememberMe: (rememberMe: boolean) => void;
};

const createAuthSlice: StateCreator<AuthState> = (set) => ({
  jwt: null,
  rememberMe: false,
  setJwt: (token, remember) => set({ jwt: token, rememberMe: remember }),
  clearJwt: () => set({ jwt: null, rememberMe: false }),
  setRememberMe: (rememberMe) => set({ rememberMe }),
});

export default createAuthSlice;
