import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_URL } from '../utils';

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  userLikes: [],
  
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);

    set({ allUsers: response.data })
  },

  fetchUserLikes: async (userId: string) => {
    const response = await axios.get(`${BASE_URL}/api/userLikes/${userId}`);

    set({ userLikes : response.data })
  },

  removeUserLikes: () => set({ userLikes: [] }),
});

const useAuthStore = create(
  persist(authStore, {
    name: 'auth'
  })
)

export default useAuthStore