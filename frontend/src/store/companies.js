import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

const slice = createSlice({
  name: 'companies',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    companiesRequested: (state, action) => {
      state.loading = true;
    },
    companiesRequestFailed: (state, action) => {
      state.loading = false;
    },
    companiesReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    companyAdded: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

const {
  companiesRequested,
  companiesRequestFailed,
  companiesReceived,
  companyAdded,
} = slice.actions;

export default slice.reducer;

//Action Creators
const url = '/companies';

export const loadCompanies = () =>
  apiCallBegan({
    url,
    onStart: companiesRequested.type,
    onSuccess: companiesReceived.type,
    onError: companiesRequestFailed.type,
  });

export const addCompany = (company) =>
  apiCallBegan({
    url,
    method: 'post',
    data: company,
    onSuccess: companyAdded.type,
  });
