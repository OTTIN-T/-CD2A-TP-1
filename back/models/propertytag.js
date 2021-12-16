"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyTag.belongsTo(models.Tag);
      PropertyTag.belongsTo(models.Property);
    }
  }
  PropertyTag.init(
    {},
    {
      sequelize,
      modelName: "PropertyTag",
    }
  );
  return PropertyTag;
};
