module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING(60), allowNull:false },
    email: { type: DataTypes.STRING(120), allowNull:false, unique:true },
    address: { type: DataTypes.STRING(400) },
    password: { type: DataTypes.STRING(200), allowNull:false },
    role: { type: DataTypes.ENUM('admin','normal','store_owner'), defaultValue:'normal' }
  }, {});
  User.associate = function(models){
    User.hasMany(models.Store, { foreignKey: 'ownerId', as: 'stores' })
    User.hasMany(models.Rating, { foreignKey: 'userId', as: 'ratings' })
  }
  return User;
}
