'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Stores', [
      { name:'Sweet Bakes', email:'sweet@example.com', address:'Street 1', ownerId: null, createdAt:new Date(), updatedAt:new Date() },
      { name:'Daily Bread', email:'bread@example.com', address:'Street 2', ownerId: null, createdAt:new Date(), updatedAt:new Date() }
    ], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stores', null, {})
  }
}
