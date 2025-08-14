'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stores', {
      id: { allowNull:false, autoIncrement:true, primaryKey:true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING(150), allowNull:false },
      email: { type: Sequelize.STRING(120), allowNull:false, unique:true },
      address: { type: Sequelize.STRING(400) },
      ownerId: { type: Sequelize.INTEGER, references: { model: 'Users', key: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' },
      createdAt: { allowNull:false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull:false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stores')
  }
}
