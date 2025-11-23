import { api } from '@/api/axios';
import type { User } from '@/types';
import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  interface State {
    token: string | null;
    isSignedIn: boolean;
    user: User | null;
  }
  const state = reactive<State>({
    token: null,
    isSignedIn: false,
    user: null,
  });

  const loadState = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      logout();
      return;
    }
    state.token = token;
    const user = JSON.parse(localStorage.getItem('user') || '');
    if (!user) {
      state.user = await fetchUser();
    }
    state.isSignedIn = true;
  };

  const fetchUser = async (): Promise<User | null> => {
    try {
      const response = await api.get<User>('/user/me', {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      return response.data;
    } catch (err) {
      console.error('Failed to fetch user data', err);
      if (err instanceof AxiosError && err.response?.status === 401) {
        logout();
      }
      return null;
    }
  };

  const setToken = async (token: string) => {
    state.token = token;
    localStorage.setItem('token', token);
    state.isSignedIn = true;
    state.user = await fetchUser();
    localStorage.setItem('user', JSON.stringify(state.user));
  };

  const logout = () => {
    state.token = null;
    state.user = null;
    state.isSignedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return { state, setToken, loadState, logout };
});
