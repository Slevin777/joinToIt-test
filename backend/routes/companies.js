const { Company, validate } = require('../models/company');
const express = require('express');

const router = express.Router();

//get all companies
router.get('/', async (req, res) => {
  // throw new Error('fdsfs');
  const companies = await Company.find().sort('lastName');

  res.send(companies);
});

//add new employee
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let company = new Company({
    name: req.body.name,
    email: req.body.email,
    logo: req.body.logo,
    website: req.body.website,
  });

  await company.save();

  res.send(company);
});

//get company by Id
router.get('/:id', async (req, res) => {
  const Company = await Company.findById(req.params.id);

  if (!Company)
    return res.status(400).send('Company with given id wan not found');

  res.send(Company);
});

//update employee by Id
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const company = await Company.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      logo: req.body.logo,
      website: req.body.website,
    },
    { new: true }
  );

  if (!company)
    return res.status(404).send('Company with given id wan not found');

  res.send(company);
});

//delete company by Id
router.delete('/:id', async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company)
    return res.status(400).send('Company with given id wan not found');

  res.send(company);
});

module.exports = router;
