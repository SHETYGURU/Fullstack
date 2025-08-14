module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    address: { type: DataTypes.STRING(400) },
    ownerId: { type: DataTypes.INTEGER, allowNull: true }
  }, {});

  Store.associate = function(models) {
    Store.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    Store.hasMany(models.Rating, { foreignKey: 'storeId', as: 'ratings' });

    // NEW: Association for the current logged-in user's rating
    Store.hasOne(models.Rating, { foreignKey: 'storeId', as: 'userRatingRecord' });
  };

  return Store;
};
