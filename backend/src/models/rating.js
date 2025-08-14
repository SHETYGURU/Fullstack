module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: { type: DataTypes.INTEGER, allowNull:false },
    storeId: { type: DataTypes.INTEGER, allowNull:false },
    rating: { type: DataTypes.INTEGER, allowNull:false }
  }, {
    indexes: [
      { unique: true, fields: ['userId','storeId'] }
    ]
  });
  Rating.associate = function(models){
    Rating.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    Rating.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store' })
  }
  return Rating;
}
