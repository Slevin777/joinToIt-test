require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const error = require('./middleware/error');

const app = express();
const db = config.get('db');

const employees = require('./routes/employees');
const companies = require('./routes/companies');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/employees', employees);
app.use('/api/companies', companies);

app.use(error);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Connected to ${db}`));

const port = process.env.PORT || 9001;

app.listen(port, () => console.log(`Listening on port ${port}...`));
