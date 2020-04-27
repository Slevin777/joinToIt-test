const { Employee, validate } = require('../models/employee');
const express = require('express');

const router = express.Router();

//get all employees
router.get('/', async (req, res) => {
  let employees;
  const { pageNumber, pageSize } = req.query;

  if (pageNumber && pageSize) {
    employees = await Company.find()
      .select('-__v')
      .skip((pageNumber - 1) * pageSize)
      .limit(parseInt(pageSize))
      .sort('lastName')
      .populate('company', 'name');
  } else {
    employees = await Employee.find()
      .select('-__v')
      .sort('lastName')
      .populate('company', 'name');
  }
  res.send(employees);
});

//create new employee
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
  });

  await employee.save();

  res.send(employee);
});

//get employee by Id
router.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee)
    return res.status(400).send('Employee with given id wan not found');

  res.send(employee);
});

//update employee by Id
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
    },
    { new: true }
  );

  if (!employee)
    return res.status(404).send('Employee with given id wan not found');

  res.send(employee);
});

//delete employee by Id
router.delete('/:id', async (req, res) => {
  const employee = await Employee.findByIdAndRemove(req.params.id);

  if (!employee)
    return res.status(400).send('Employee with given id wan not found');

  res.send(employee);
});

module.exports = router;
