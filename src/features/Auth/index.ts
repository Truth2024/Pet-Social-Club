import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//TYPES
import type { Mode } from '../../types/Auth/mode';

export interface CounterState {
  mode: Mode;
  isOpen: boolean;
  error: string | null;
}

const initialState: CounterState = {
  mode: 'login',
  isOpen: false,
  error: null,
};

export const AuthorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.mode = 'login';
      state.isOpen = action.payload;
    },
    setMode: (state) => {
      state.mode = state.mode == 'login' ? 'reg' : 'login';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpen, setMode } = AuthorizationSlice.actions;

export default AuthorizationSlice.reducer;
