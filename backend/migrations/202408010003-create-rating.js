'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ratings', {
      id: { allowNull:false, autoIncrement:true, primaryKey:true, type: Sequelize.INTEGER },
      userId: { type: Sequelize.INTEGER, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' },
      storeId: { type: Sequelize.INTEGER, references: { model: 'Stores', key: 'id' }, onDelete: 'CASCADE' },
      rating: { type: Sequelize.INTEGER, allowNull:false },
      createdAt: { allowNull:false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull:false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
    await queryInterface.addConstraint('Ratings', {
      fields: ['userId','storeId'],
      type: 'unique',
      name: 'unique_user_store_rating'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ratings')
  }
}
