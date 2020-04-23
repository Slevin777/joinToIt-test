import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCompanies, addCompany } from '../store/companies';

const CompaniesList = (props) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.list);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log('hey');
    dispatch(loadCompanies());
  }, [dispatch]);

  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(addCompany({ name, email }));
  };

  return (
    <>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>{company.name}</li>
        ))}
      </ul>

      <form onSubmit={handleSumbit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Add new company</button>
      </form>
    </>
  );
};

export default CompaniesList;
