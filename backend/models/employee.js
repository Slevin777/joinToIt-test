const Joi = require('joi');
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
  }
  // {
  //   timestamps: true,
  // }
);

const Employee = mongoose.model('Employee', employeeSchema);

function validateEmployee(employee) {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string(),
    email: Joi.string(),
    company: Joi.string(),
  };

  return Joi.validate(employee, schema);
}

exports.Employee = Employee;
exports.validate = validateEmployee;
