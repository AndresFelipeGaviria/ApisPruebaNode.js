const faker = require('faker');

class UsersService {

  constructor() {
    this.users = []
    this.generate();
  }

  generate() {

    for (let index = 0; index < 10; index++) {
      this.users.push({
        uuid: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        gander: faker.name.gender(),
        jobArea: faker.name.jobArea()
      })

    }
  }

  getUsers() {
    return this.users

  }
}

module.exports = UsersService;
