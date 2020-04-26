import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { addEmloyee, deleteEmployee, updateEmployee } from '../store/employees';
import { loadCompanies } from '../store/companies';

const EmployeeForm = ({ match }) => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  });

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const companies = useSelector((state) => state.companies.list);

  const employeeId = match.params.id;

  useEffect(() => {
    dispatch(loadCompanies());
    if (employeeId === 'new') return;

    const employee = employees.find((employee) => employee._id === employeeId);
    setEmployee(mapToViewModel(employee));
  }, [employees, employeeId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employeeId === 'new') {
      dispatch(addEmloyee(employee));
    } else {
      dispatch(updateEmployee(employee));
    }
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(employee));
  };

  const updateField = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCompany = (e) => {
    setEmployee({
      ...employee,
      company: e.target.value,
    });
  };

  const mapToViewModel = (employee) => {
    return {
      _id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      // company: employee.company._id,
    };
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
        <FormControl>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={employee.company}
            onChange={handleChangeCompany}
          >
            {companies.map((company) => (
              <MenuItem key={company._id} value={company._id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
