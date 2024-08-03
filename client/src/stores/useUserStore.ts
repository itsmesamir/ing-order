import { create } from 'zustand';

import { getCurrentUser } from 'services/auth';

import { User } from 'types/User';
import { Any } from 'types/common';

interface TUserState {
  data: User | null;
  loading: boolean;
  success: boolean;
  error: boolean;
  errorData: Any;
}

interface TUserStore extends TUserState {
  updateUser: (user: User) => void;
  fetchUser: () => void;
  removeUser: () => void;
}

const initialState: TUserState = {
  loading: true,
  success: false,
  error: false,
  data: null,
  errorData: null,
};
const user: User = {
  id: 1,
  name: 'Simon',
  email: 'cimon@gmail.com',
  country: 'Nepal',
  countryId: 1,
  department: 'string',
  designationId: 1,
  designation: {
    id: 1,
    name: 'string',
  },
  manager: {
    id: 1,
    name: 'Bibek',
    email: 'bibek@gmail.com',
  },
  phone: '123',
  roles: [
    {
      id: 2,
      name: 'Admin',
    },
  ],
};

const useUserStore = create<TUserStore>()(set => ({
  ...initialState,
  fetchUser: async () => {
    set({ ...initialState, loading: true });

    set({ ...initialState, success: true, loading: false, data: user });
    // try {
    //   const data = await getCurrentUser();

    //   set({ ...initialState, success: true, loading: false, data });
    // } catch (error: Any) {
    //   set({ ...initialState, error: true, loading: false, errorData: error?.message });
    // }
  },

  updateUser: (user: User) => {
    set(state => ({
      ...state,
      loading: false,
      data: user,
    }));
  },
  removeUser: () => set({ data: null }),
}));

export default useUserStore;
