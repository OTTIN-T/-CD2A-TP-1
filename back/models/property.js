"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsTo(models.User);
      Property.hasMany(models.PropertyTag);
      Property.belongsToMany(models.Tag, {
        through: models.PropertyTag,
      });
    }
  }
  Property.init(
    {
      title: DataTypes.STRING,
      picture: DataTypes.STRING,
      price: DataTypes.INTEGER,
      sector: DataTypes.STRING,
      room: DataTypes.INTEGER,
      description: DataTypes.STRING,
      advantage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};
