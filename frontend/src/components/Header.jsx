import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.currentUser);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location = '/';
  };

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <Typography className={classes.menuButton}>
          <Link to="/companies" className={classes.link}>
            Companies
          </Link>
        </Typography>
        <Typography className={classes.margin}>
          <Link to="/employees" className={classes.link}>
            Employees
          </Link>
        </Typography>
        <Typography>{user ? user.email : null}</Typography>
        {user && (
          <Button onClick={handleLogOut} color="inherit">
            Logout
          </Button>
        )}
        {!user && (
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  margin: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
}));

export default Header;
