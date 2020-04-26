import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, makeStyles, Avatar } from '@material-ui/core';
import { addCompany, updateCompany, deleteCompany } from '../store/companies';
import { Link } from 'react-router-dom';

const CompanyForm = ({ history, match }) => {
  const [company, setCompany] = useState({
    logo: null,
    name: '',
    email: '',
    website: '',
  });

  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies);

  const companyId = match.params.id;

  useEffect(() => {
    if (companyId === 'new') return;

    const company = companies.list.find((company) => company._id === companyId);
    setCompany(company);
  }, [companies.list, companyId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (companyId === 'new') {
      const formData = new FormData();
      formData.append('name', company.name);
      formData.append('email', company.email);
      formData.append('logo', company.logo);
      formData.append('website', company.website);

      dispatch(addCompany(formData));
    } else {
      dispatch(updateCompany(company));
    }
    history.push('/companies');
  };

  const handleDelete = () => {
    dispatch(deleteCompany(company));
    history.replace('/companies');
  };

  const handleSelectFile = (e) => {
    setCompany({
      ...company,
      logo: e.target.files[0],
    });
  };

  const updateField = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();
  const serverUrl = 'http://localhost:9001/';

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        {company._id && (
          <Avatar
            alt="logo"
            variant="square"
            src={serverUrl + company.logo}
            className={classes.large}
          />
        )}
        <Button
          variant="contained"
          component="label"
          size="small"
          className={classes.button}
        >
          Upload Logo
          <input
            type="file"
            onChange={handleSelectFile}
            style={{ display: 'none' }}
          />
        </Button>
        <TextField
          label="Name"
          value={company.name}
          name="name"
          className={classes.input}
          onChange={updateField}
        />
        <TextField
          label="Email"
          value={company.email}
          name="email"
          className={classes.input}
          onChange={updateField}
        />
        <TextField
          label="Website"
          value={company.website}
          name="website"
          className={classes.input}
          onChange={updateField}
        />

        <div className="buttons">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.mr}
          >
            save
          </Button>
          {companyId !== 'new' && (
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
      <br></br>
      <hr />
      <div className="user">
        <h1>Manage users</h1>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="employees/new"
        >
          new Employee
        </Button>
      </div>
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

export default CompanyForm;
