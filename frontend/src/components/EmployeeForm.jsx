import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { addEmloyee } from '../store/employees';

const EmployeeForm = ({ history, match }) => {
  const [employee, setCompany] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '5ea47c3f9a52fd3f1c07d348',
  });

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);

  const employeeId = match.params.id;

  useEffect(() => {
    if (employeeId === 'new') return;

    const employee = employees.list.find(
      (employee) => employee._id === employeeId
    );
    setCompany(employee);
  }, [employees.list, employeeId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employeeId === 'new') {
      dispatch(addEmloyee(employee));
    } else {
      // dispatch(updateEmployee(employee));
    }
    // history.push('/companies');
  };

  const handleDelete = () => {
    // dispatch(deleteCompany(employee));
  };

  const updateField = (e) => {
    setCompany({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="First Name"
          value={employee.firstName}
          name="firstName"
          className={classes.input}
          onChange={updateField}
        />
        <TextField
          label="Last Name"
          value={employee.lastName}
          name="lastName"
          className={classes.input}
          onChange={updateField}
        />
        <TextField
          label="Email"
          value={employee.email}
          name="email"
          className={classes.input}
          onChange={updateField}
        />
        <TextField
          label="Phone"
          value={employee.phone}
          name="phone"
          className={classes.input}
          onChange={updateField}
        />
        {/* <TextField
          label="Phone"
          value={employee.company.name}
          name="phone"
          className={classes.input}
          // onChange={updateField}
        /> */}

        <div className="buttons">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.mr}
          >
            save
          </Button>
          {employeeId !== 'new' && (
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              onClick={handleDelete}
            >
              delete
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    // margin: '0 auto',
  },
  input: {
    marginBottom: theme.spacing(2),
  },

  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  mr: {
    marginRight: theme.spacing(2),
  },
  button: {
    maxWidth: 120,
    margin: `${theme.spacing(2)}px 0`,
  },
}));

export default EmployeeForm;
