const { Company, validate } = require('../models/company');
const express = require('express');
const sendMail = require('../mailer');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const config = require('config');

const router = express.Router();

//get all companies
router.get('/', async (req, res) => {
  const companies = await Company.find().sort('lastName').select('-__v');

  res.send(companies);
});

//add new company
router.post('/', upload.single('file'), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const logoPath = config.get('serverURL') + req.file.path;

  let company = new Company({
    name: req.body.name,
    email: req.body.email,
    logo: logoPath,
    website: req.body.website,
  });

  await company.save();

  sendMail(
    'airon223@gmail.com',
    'New Company added',
    `Company ${req.body.name} have beed added`,
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('message sent!');
      }
    }
  );

  res.send(company);
});

//get company by Id
router.get('/:id', async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company)
    return res.status(400).send('Company with given id wan not found');

  res.send(company);
});

//update company by Id
router.put('/:id', upload.single('file'), async (req, res) => {
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
router.delete('/:id', auth, async (req, res) => {
  const company = await Company.findByIdAndRemove(req.params.id);
  if (!company)
    return res.status(400).send('Company with given id wan not found');

  res.send(company);
});

module.exports = router;
