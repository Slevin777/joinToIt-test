import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCompanies } from '../store/companies';
import Table from './common/table';
import { Link } from 'react-router-dom';
import { Button, Avatar, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const CompaniesList = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.list);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = companies.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(companies.length / postsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(loadCompanies());
  }, [dispatch]);

  const classes = useStyles();

  const columns = [
    {
      path: 'logo',
      label: 'Logo',
      content: (company) => {
        return (
          <Avatar
            alt="logo"
            variant="square"
            src={company.logo}
            className={classes.logoSize}
          />
        );
      },
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
      <Table columns={columns} data={currentPosts} />
      <Pagination
        count={totalPages}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        className={classes.pagination}
      />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  logoSize: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0 50px',
  },
}));

export default CompaniesList;
