import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEmployees } from '../store/employees';
import Table from './common/table';
import { Link } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const EmployeesList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = employees.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(employees.length / postsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const columns = [
    {
      path: 'firstName',
      label: 'First Name',
      content: (employee) => (
        <Link to={`/employees/${employee._id}`}>{employee.firstName}</Link>
      ),
    },
    {
      path: 'lastName',
      label: 'Last Name',
    },
    {
      path: 'company.name',
      label: 'Company',
    },
    {
      path: 'email',
      label: 'E-mail',
    },
    {
      path: 'phone',
      label: 'Phone',
    },
    // {
    //   path: 'company',
    //   label: 'Company',
    // },
  ];

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/employees/new"
      >
        New Employee
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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0 50px',
  },
}));

export default EmployeesList;
