'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Users.hasMany(models.Burgers, {
          onDelete: "CASCADE",
          hooks: true,
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Users;
};