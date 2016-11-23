'use strict';
module.exports = function(sequelize, DataTypes) {
  var Burgers = sequelize.define('Burgers', {
    burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Burgers.belongsTo(models.Users, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Burgers;
};