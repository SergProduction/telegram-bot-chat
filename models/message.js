'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('message', {
    message_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    text: DataTypes.TEXT,
    reply: DataTypes.INTEGER,
    date: DataTypes.DATE,
  }, {
    timestamps: false,
    underscored: true,
  });
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};