'use strict';
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pass = await bcrypt.hash('Admin@123', 10)
    await queryInterface.bulkInsert('Users', [{
      name: 'BakeCart System Administrator',
      email: 'admin@bakecart.test',
      address: 'HQ',
      password: pass,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'admin@bakecart.test' }, {})
  }
}
