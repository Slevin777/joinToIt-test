import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { history } from '../index';

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
      console.log(history);
      history.goBack();
    },
    employeeUpdated: (state, action) => {
      const index = state.list.findIndex(
        (employee) => employee._id === action.payload._id
      );

      state.list[index] = action.payload;
      history.goBack();
    },
    employeeDeleted: (state, action) => {
      state.list.filter((employee) => employee._id !== action.payload._id);
      history.goBack();
    },
  },
});

const {
  employeesRequested,
  employeesRequestFailed,
  employeesReceived,
  employeeAdded,
  employeeUpdated,
  employeeDeleted,
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

export const updateEmployee = (employee) => {
  const body = { ...employee };
  delete body._id;

  return apiCallBegan({
    url: `${url}/${employee._id}`,
    method: 'put',
    data: body,
    onSuccess: employeeUpdated.type,
  });
};

export const deleteEmployee = (employee) =>
  apiCallBegan({
    url: `${url}/${employee._id}`,
    method: 'delete',
    data: employee,
    onSuccess: employeeDeleted.type,
  });
