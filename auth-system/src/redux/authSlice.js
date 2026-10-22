import { createSlice } from '@reduxjs/toolkit';

// Retrieve initial state from localStorage if available
const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Persist in localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      // Evaluation Part 6: All states set to null and tokens removed
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { signupSuccess, logout } = authSlice.actions;
export default authSlice.reducer;