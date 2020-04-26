import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import CompaniesList from './components/CompaniesList';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import CompanyForm from './components/Company';
import { Container } from '@material-ui/core';
import { fetchUser } from './store/auth';

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
          <Route path="/login" component={LoginPage} />
          <Route path="/companies" component={CompaniesList} />
          <Route path="/employees" component={CompaniesList} />
          <Redirect to="/companies" />
        </Switch>
      </Container>
    </>
  );
}

export default App;
