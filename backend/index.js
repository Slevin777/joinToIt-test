require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const error = require('./middleware/error');

///////////////////////////////////////////
const faker = require('faker');
console.log(faker.fake('{{name.lastName}}'));

faker.seed(123);

var firstRandom = faker.random.number();

// Setting the seed again resets the sequence.
faker.seed(123);

var secondRandom = faker.random.number();

console.log(firstRandom);
///////////////////////////////////////////

const app = express();
const db = config.get('db');

const employees = require('./routes/employees');
const companies = require('./routes/companies');
const users = require('./routes/users');

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', users);
app.use('/api/employees', employees);
app.use('/api/companies', companies);

app.use(error);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log(`Connected to ${db}`));

const port = process.env.PORT || 9001;

app.listen(port, () => console.log(`Listening on port ${port}...`));
