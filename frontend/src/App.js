import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import CompaniesList from './components/CompaniesList';
import EmployeesList from './components/EmployeesList';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import { Switch, Route, Redirect } from 'react-router';
import LoginPage from './LoginPage';
import CompanyForm from './components/CompanyForm';
import { Container } from '@material-ui/core';
import { fetchUser } from './store/auth';
import EmployeeForm from './components/EmployeeForm';

import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.token;
    if (token) dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Switch>
          <Route path="/companies/:id" component={CompanyForm} />
          <Route path="/employees/:id" component={EmployeeForm} />
          <Route path="/login" component={LoginPage} />
          <Route path="/companies" component={CompaniesList} />
          <Route path="/employees" component={EmployeesList} />
          <Redirect to="/companies" />
        </Switch>
        <ToastContainer autoClose={3000} />
      </Container>
    </>
  );
}

export default App;
