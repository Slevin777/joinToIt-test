import { combineReducers } from 'redux';
import companies from './companies';
import employees from './employees';
import auth from './auth';

export default combineReducers({
  auth,
  companies,
  employees,
});
