import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import api from './middleware/api';
import rootReducer from './rootReducer';
import toast from './middleware/toast';

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }),
    toast,
    api,
  ],
});

export default store;
