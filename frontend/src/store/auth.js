import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
// import { setJwt } from './middleware/api';

const slice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    userLoginRequested: (state, action) => {
      state.loading = true;
    },
    userLoginRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLoginRequestSucceeded: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.currentUser = action.payload.user;
      state.loading = false;
      window.location = '/';
    },
    userFetchSucceeded: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
  },
});

const {
  userLoginRequested,
  userLoginRequestFailed,
  userLoginRequestSucceeded,
  userFetchSucceeded,
} = slice.actions;

export default slice.reducer;

//Action Creators
const url = '/users';

export const loginUser = (user) =>
  apiCallBegan({
    url: url + '/login',
    method: 'post',
    data: user,
    onStart: userLoginRequested.type,
    onSuccess: userLoginRequestSucceeded.type,
    onError: userLoginRequestFailed.type,
  });

export const fetchUser = () =>
  apiCallBegan({
    url: url + '/profile',
    onStart: userLoginRequested.type,
    onSuccess: userFetchSucceeded.type,
    onError: userLoginRequestFailed.type,
  });
