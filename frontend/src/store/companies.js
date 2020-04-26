import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

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
    },
    companyLoaded: (state, action) => {
      state.list.push(action.payload);
    },
    companyUpdated: (state, action) => {
      const index = state.list.findIndex(
        (company) => company._id === action.payload._id
      );
      state.list[index] = action.payload;
    },
    companyDeleted: (state, action) => {
      state.list.filter((company) => company._id !== action.payload._id);
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

export const updateCompany = (company) => {
  const body = { ...company };
  delete body._id;

  return apiCallBegan({
    url: `${url}/${company._id}`,
    method: 'put',
    data: body,
    onSuccess: companyUpdated.type,
  });
};

export const deleteCompany = (company) =>
  apiCallBegan({
    url: `${url}/${company._id}`,
    method: 'delete',
    data: company,
    onSuccess: companyDeleted.type,
  });
