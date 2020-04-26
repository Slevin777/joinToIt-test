const faker = require('faker');
const { User } = require('./models/user');
const { Company } = require('./models/company');
const { Employee } = require('./models/employee');

module.exports = () => {
  User.deleteMany()
    .then(() => {
      User.create({
        email: 'admin@admin.com',
        password: 'password',
      });
    })
    .catch((er) => console.log(er));

  Company.deleteMany()
    .then(() => {
      Employee.deleteMany().then(() => {
        Array.from({ length: 2 }).forEach((i) => {
          Company.create({
            name: faker.company.companyName(),
            email: faker.internet.email(),
            website: faker.internet.url(),
            logo: faker.image.image(),
          }).then((res) => {
            console.log(res._id);
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
    })
    .catch((er) => console.log(er));
};
