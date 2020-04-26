import React, { useState } from 'react';
import { TextField, makeStyles, Button } from '@material-ui/core';
import { loginUser } from './store/auth';
import { useDispatch } from 'react-redux';

const LoginPage = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    // window.location = '/';
  };

  return (
    <form onSubmit={handleSumbit} className={classes.form}>
      <TextField
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
      >
        Log In
      </Button>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
    margin: '10vh auto',
  },
  button: {
    maxWidth: 100,
    alignSelf: 'center',
    marginTop: theme.spacing(2),
  },
}));

export default LoginPage;
