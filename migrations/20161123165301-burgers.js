'use strict';


var models = require('../models');


module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Altering commands here.
    */
    return models.Burgers.bulkCreate(
      [
        {burger_name: "Double Double"},
        {burger_name: "Thick & Hearty"},
        {burger_name: "Bacon Cheeseburger"},
        {burger_name: "Whopper"},
        {burger_name: "McDouble"}
      ]
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Reverting commands here.      
    */
    return models.Burgers.destroy({where:{burger_name: [
        "Double Double",
        "Thick & Hearty",
        "Bacon Cheeseburger",
        "Whopper",
        "McDouble"
    ]}})
  }
};
