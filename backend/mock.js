const faker = require('faker');
const bcrypt = require('bcrypt');
const { User } = require('./models/user');
const { Company } = require('./models/company');
const { Employee } = require('./models/employee');

module.exports = async (quantity = 2) => {
  const password = await bcrypt.hash('password', await bcrypt.genSalt(10));
  User.deleteMany()
    .then(() => {
      User.create({
        email: 'admin@admin.com',
        password,
      });
    })
    .catch((er) => console.log(er));

  Company.deleteMany()
    .then(() => {
      Employee.deleteMany().then(() => {
        Array.from({ length: quantity }).forEach(() => {
          Company.create({
            name: faker.company.companyName(),
            email: faker.internet.email(),
            website: faker.internet.url(),
            logo: faker.image.image(),
          }).then((res) => {
            Array.from({ length: quantity * 5 }).forEach(() => {
              Employee.create({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumberFormat(),
                company: res._id,
              });
            });
          });
        });
      });
    })
    .catch((er) => console.log(er));
};
