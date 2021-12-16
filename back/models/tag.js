"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.hasMany(models.PropertyTag);
      Tag.belongsToMany(models.Property, {
        through: models.PropertyTag,
      });
    }
  }
  Tag.init(
    {},
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
