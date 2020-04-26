import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCompanies } from '../store/companies';
import Table from './common/table';
import { Link } from 'react-router-dom';
import { Button, Avatar, makeStyles } from '@material-ui/core';

const CompaniesList = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.list);

  useEffect(() => {
    dispatch(loadCompanies());
  }, [dispatch]);

  const serverUrl = 'http://localhost:9001/';
  const classes = useStyles();

  const columns = [
    {
      path: 'logo',
      label: 'Logo',
      content: (company) => (
        <Avatar
          alt="logo"
          variant="square"
          src={serverUrl + company.logo}
          className={classes.large}
        />
      ),
    },
    {
      path: 'name',
      label: 'Name',
      content: (company) => (
        <Link to={`/companies/${company._id}`}>{company.name}</Link>
      ),
    },
    {
      path: 'email',
      label: 'E-mail',
    },
    {
      path: 'website',
      label: 'WWW',
    },
  ];

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/companies/new"
      >
        Add company
      </Button>
      <Table columns={columns} data={companies} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default CompaniesList;
