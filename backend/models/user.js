const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    u
  },
  phone: {
    type: String,
  },
  company: {
    type: String,
  },
})