import axios from 'axios';
import { apiCallBegan, apiCallSuccess, apiCallFailed } from '../api.js';

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: 'http://localhost:9001/api',
      url,
      method,
      data,
    });

    if (onSuccess) return dispatch({ type: onSuccess, payload: response.data });
    dispatch(apiCallSuccess(response.data));
  } catch (error) {
    if (onError) return dispatch({ type: onError, payload: error.message });
    dispatch(apiCallFailed(error.message));
  }
};

export default api;
