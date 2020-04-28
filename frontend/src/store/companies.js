import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { history } from '../index';

const slice = createSlice({
  name: 'companies',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    companiesRequested: (state, action) => {
      state.loading = true;
    },
    companiesRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    companiesReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    companyAdded: (state, action) => {
      state.list.push(action.payload);
      history.goBack();
    },
    companyLoaded: (state, action) => {
      state.currentCompany = action.payload;
      state.loading = false;
    },
    companyUpdated: (state, action) => {
      const index = state.list.findIndex(
        (company) => company._id === action.payload._id
      );
      state.list[index] = action.payload;
      history.goBack();
    },
    companyDeleted: (state, action) => {
      state.list.filter((company) => company._id !== action.payload._id);
      history.goBack();
    },
  },
});

const {
  companiesRequested,
  companiesRequestFailed,
  companiesReceived,
  companyAdded,
  companyUpdated,
  companyDeleted,
  companyLoaded,
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

export const loadCompany = (companyId) =>
  apiCallBegan({
    url: url + '/' + companyId,
    onSuccess: companyLoaded.type,
  });

export const updateCompany = (company, companyId) =>
  apiCallBegan({
    url: `${url}/${companyId}`,
    method: 'put',
    data: company,
    onSuccess: companyUpdated.type,
  });

export const deleteCompany = (company) =>
  apiCallBegan({
    url: `${url}/${company._id}`,
    method: 'delete',
    data: company,
    onSuccess: companyDeleted.type,
  });
