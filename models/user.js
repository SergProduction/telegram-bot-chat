'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    message_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    text: DataTypes.TEXT,
    reply: DataTypes.INTEGER,
    date: DataTypes.DATE,
  }, {
    timestamps: false,
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};