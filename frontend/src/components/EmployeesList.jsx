import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEmployees } from '../store/employees';
import Table from './common/table';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const EmployeesList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

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
      <Table columns={columns} data={employees} />
    </>
  );
};

export default EmployeesList;
