import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

const slice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    employeesRequested: (state, action) => {
      state.loading = true;
    },
    employeesRequestFailed: (state, action) => {
      state.loading = false;
    },
    employeesReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    employeeAdded: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

const {
  employeesRequested,
  employeesRequestFailed,
  employeesReceived,
  employeeAdded,
} = slice.actions;

export default slice.reducer;

//Action Creators
const url = '/employees';

export const loadEmployees = () =>
  apiCallBegan({
    url,
    onStart: employeesRequested.type,
    onSuccess: employeesReceived.type,
    onError: employeesRequestFailed.type,
  });

export const addEmloyee = (employee) =>
  apiCallBegan({
    url,
    method: 'post',
    data: employee,
    onSuccess: employeeAdded.type,
  });
