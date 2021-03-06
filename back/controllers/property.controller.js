const { Op } = require("sequelize");
const Property = require("../models").Property;
const Tag = require("../models").Tag;
const tokenService = require("../services/token.service");
const bodyService = require("../services/body.service");

exports.property_add = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = await tokenService.verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (!decodedToken.estateAgent && !decodedToken.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let bodyValidate = req.body;
  bodyValidate.UserId = decodedToken.id;
  bodyValidate = await bodyService.bodyValidator(bodyValidate);

  if (!bodyValidate) {
    return res.status(400).json({ message: "Field required" });
  }

  //Fonctionne très bien avec le front,
  //mais ne fonctionne pas sur Postman sans faire cette modif...
  // let tags = [];
  // bodyValidate.tags.split(",").forEach((tag) => {
  //   tags.push(Number(tag.trim()));
  // });

  if (req.file) {
    bodyValidate.picture = `public/upload/property/${req.file.filename.trim()}`;
  }

  Property.findOne({
    where: {
      title: bodyValidate.title,
    },
  })
    .then((property) => {
      if (property) {
        return res
          .status(409)
          .json({ message: "Property title already exist" });
      }

      Property.create(bodyValidate)
        .then((propertyCreated) => {
          propertyCreated
            .setTags(bodyValidate.tags)
            .then(() => {
              res.status(201).json(propertyCreated);
            })
            .catch((err) => {
              console.log("err set tags", err);
            });
        })
        .catch((error) => {
          console.log("error create", error);
        });
    })
    .catch((err) => console.log("error findOne", err));
};

exports.property_list = (req, res, next) => {
  Property.findAll({
    attributes: ["id", "title", "address", "price", "sector"],
    include: [
      {
        model: Tag,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((properties) => {
      if (properties.length === 0) {
        return res.status(204).json({ message: "No properties" });
      }
      res.status(200).json(properties);
    })
    .catch((error) => console.log("error findAll", error));
};

exports.property_detail = (req, res, next) => {
  Property.findByPk(req.params.id, {
    attributes: [
      "id",
      "title",
      "picture",
      "address",
      "price",
      "sector",
      "room",
      "description",
      "advantage",
    ],
    include: [
      {
        model: Tag,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((property) => {
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.status(200).json(property);
    })
    .catch((error) => console.log("error findByPk", error));
};

exports.search_tag_property = (req, res, next) => {
  Property.findAll({
    attributes: ["id", "title", "price", "description"],
    include: [
      {
        model: Tag,
        attributes: ["id", "name"],
        where: {
          name: {
            [Op.substring]: req.params.tag,
          },
        },
      },
    ],
  })
    .then((properties) => {
      res.status(200).json(properties);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.search_property = (req, res, next) => {
  Property.findAll({
    attributes: ["id", "title", "price", "description"],
    include: [
      {
        model: Tag,
        attributes: ["id", "name"],
      },
    ],
    where: {
      title: {
        [Op.substring]: req.params.search,
      },
    },
  })
    .then((properties) => {
      res.status(200).json(properties);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.property_update = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = await tokenService.verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (!decodedToken.estateAgent && !decodedToken.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let bodyValidate = req.body;
  console.log("bodyValidate", bodyValidate);

  Property.findByPk(req.params.id)
    .then(async (property) => {
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      if (!decodedToken.admin && decodedToken.id !== property.UserId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (req.file) {
        bodyValidate.picture = `public/upload/property/${req.file.filename.trim()}`;
      }

      bodyValidate.UserId = decodedToken.id;
      bodyValidate = await bodyService.bodyValidator(bodyValidate);

      if (!bodyValidate) {
        return res.status(400).json({ message: "Field required" });
      }

      Property.findOne({
        where: {
          title: bodyValidate.title,
        },
      })
        .then((propertyName) => {
          if (propertyName && propertyName.id !== property.id) {
            return res
              .status(409)
              .json({ message: "Property name already exist" });
          }
          property
            .update(bodyValidate)
            .then((property) => {
              property
                .setTags(bodyValidate.tags)
                .then(() => {
                  res.status(200).json(property);
                })
                .catch((err) => {
                  console.log("err set tags", err);
                });
            })
            .catch((error) => {
              console.log("error update", error);
            });
        })
        .catch((err) => console.log("error findOne", err));
    })
    .catch((error) => {
      console.log("error findByPk", error);
    });
};

exports.property_delete = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = await tokenService.verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (!decodedToken.estateAgent && !decodedToken.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  Property.findByPk(req.params.id, {
    attributes: ["id", "title"],
  })
    .then((property) => {
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      if (!decodedToken.admin && decodedToken.id !== property.UserId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      property
        .destroy()
        .then(() => {
          res
            .status(200)
            .json({ message: `Property ${property.title} deleted` });
        })
        .catch((error) => {
          console.log("error delete", error);
        });
    })
    .catch((error) => {
      console.log("error findByPk", error);
    });
};
