'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: { allowNull:false, autoIncrement:true, primaryKey:true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING(60), allowNull:false },
      email: { type: Sequelize.STRING(120), allowNull:false, unique:true },
      address: { type: Sequelize.STRING(400) },
      password: { type: Sequelize.STRING(200), allowNull:false },
      role: { type: Sequelize.ENUM('admin','normal','store_owner'), defaultValue:'normal' },
      createdAt: { allowNull:false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull:false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')
  }
}
