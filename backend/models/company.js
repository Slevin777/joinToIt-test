const Joi = require('joi');
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  logo: {
    type: String,
  },
  website: {
    type: String,
  },
});

const Company = mongoose.model('Company', companySchema);

function validateCompany(company) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string(),
    logo: Joi.string(),
    website: Joi.string(),
  };

  return Joi.validate(company, schema);
}

exports.Company = Company;
exports.validate = validateCompany;
