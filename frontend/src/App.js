import React from 'react';
// import logo from './logo.svg';
import './App.css';
import CompaniesList from './components/CompaniesList';
import { Provider } from 'react-redux';
import store from './store/configureStore';

function App() {
  return (
    <Provider store={store}>
      <CompaniesList />
    </Provider>
  );
}

export default App;
