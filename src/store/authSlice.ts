// // import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // interface User {
// //   id: number;
// //   username: string;
// //   email: string;
// //   avatarUrl: string | null;
// // }

// // interface AuthState {
// //   user: User | null;
// //   token: string | null;
// //   isAuthenticated: boolean;
// // }

// // const initialState: AuthState = {
// //   user: JSON.parse(localStorage.getItem('user') || 'null'),
// //   token: localStorage.getItem('token'),
// //   isAuthenticated: !!localStorage.getItem('token'),
// // };

// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState,
// //   reducers: {
// //     setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
// //       state.user = action.payload.user;
// //       state.token = action.payload.token;
// //       state.isAuthenticated = true;
// //       localStorage.setItem('user', JSON.stringify(action.payload.user));
// //       localStorage.setItem('token', action.payload.token);
// //     },
// //     logout: (state) => {
// //       state.user = null;
// //       state.token = null;
// //       state.isAuthenticated = false;
// //       localStorage.removeItem('user');
// //       localStorage.removeItem('token');
// //     },
// //   },
// // });

// // export const { setCredentials, logout } = authSlice.actions;
// // export default authSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface User {
//   id: number;
//   username: string;
//   email: string;
//   avatarUrl: string | null;
//   name?: string; // Tambahan opsional untuk profil
//   bio?: string | null;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   user: JSON.parse(localStorage.getItem('user') || 'null'),
//   token: localStorage.getItem('token'),
//   isAuthenticated: !!localStorage.getItem('token'),
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       localStorage.setItem('user', JSON.stringify(action.payload.user));
//       localStorage.setItem('token', action.payload.token);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl: string | null;
  name?: string;
  bio?: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;