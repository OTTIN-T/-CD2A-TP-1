const Tag = require("../models").Tag;
const bodyService = require("../services/body.service");
const tokenService = require("../services/token.service");

exports.tag_add = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = await tokenService.verifyToken(token);

  if (!decodedToken.estateAgent && !decodedToken.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let bodyValidate = req.body;
  bodyValidate = await bodyService.bodyValidator(bodyValidate);

  if (!bodyValidate) {
    return res.status(400).json({ message: "Field required" });
  }

  Tag.findOne({
    where: {
      name: bodyValidate.name,
    },
  })
    .then((tag) => {
      if (tag) {
        return res.status(409).json({ message: "Tag already exist" });
      }

      Tag.create(bodyValidate)
        .then((tagCreated) => {
          res.status(201).json(tagCreated);
        })
        .catch((error) => {
          console.log("error create", error);
        });
    })
    .catch((err) => console.log("error find", err));
};

exports.tag_list = (req, res, next) => {
  Tag.findAll({
    attributes: ["id", "name"],
  })
    .then((tags) => {
      if (tags.length === 0) {
        return res.status(204).json({ message: "No tags" });
      }
      res.status(200).json(tags);
    })
    .catch((error) => console.log("error findAll", error));
};

exports.tag_detail = (req, res, next) => {
  Tag.findByPk(req.params.id, {
    attributes: ["id", "name"],
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: "tag not found" });
      }
      res.status(200).json(tag);
    })
    .catch((error) => console.log("error findByPk", error));
};

exports.tag_update = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = await tokenService.verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (!decodedToken.estateAgent && !decodedToken.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let bodyValidate = req.body;
  bodyValidate = await bodyService.bodyValidator(bodyValidate);

  if (!bodyValidate) {
    return res.status(400).json({ message: "Field required" });
  }

  Tag.findByPk(req.params.id)
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }

      Tag.findOne({
        where: {
          name: bodyValidate.name,
        },
      })
        .then((tagName) => {
          if (tagName) {
            return res.status(409).json({ message: "Tag already exist" });
          }

          tag
            .update(bodyValidate)
            .then((tagUpdated) => {
              res.status(200).json(tagUpdated);
            })
            .catch((error) => console.log("error update", error));
        })
        .catch((err) => console.log("error find", err));
    })
    .catch((error) => {
      console.log("error findByPk", error);
    });
};

exports.tag_delete = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = await tokenService.verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (!decodedToken.estateAgent && !decodedToken.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  Tag.findByPk(req.params.id)
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }

      tag
        .destroy()
        .then(() => {
          res.status(200).json({ message: `Tag ${tag.name} deleted` });
        })
        .catch((error) => {
          console.log("error delete", error);
        });
    })
    .catch((error) => {
      console.log("error findByPk", error);
    });
};
