import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

// Expanded User interface with common fields
interface User {
    phone?: string | null;     // Changed to explicitly allow null
    address?: string | null;   // Changed to explicitly allow null
    _id: string;              // Made required and removed null since it's an ID
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null; // Clear error when loading starts
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    updateUserDetails: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

// Selectors
export const selectUser = (state: RootState) => state.account.user;
export const selectUserLoading = (state: RootState) => state.account.loading;
export const selectUserError = (state: RootState) => state.account.error;

export const {
  setLoading,
  setUser,
  setError,
  clearUser,
  updateUserDetails,
} = accountSlice.actions;
export default accountSlice.reducer;