'use strict';
module.exports = (sequelize, DataTypes) => {
  var TFIDF = sequelize.define('TFIDF', {
    tf: DataTypes.FLOAT,
    df: DataTypes.FLOAT,
    tf_idf: DataTypes.FLOAT,
    tf_idf_cosin: DataTypes.FLOAT,
  }, {
    timestamps: false,
  });
  TFIDF.associate = function(models) {
    // associations can be defined here
    TFIDF.belongsTo(models.User)
  };
  return TFIDF;
};