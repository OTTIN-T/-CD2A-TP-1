const User = require("../models").User;
const passwordService = require("../services/password.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenService = require("../services/token.service");
const bodyService = require("../services/body.service");

exports.user_add = async (req, res, next) => {
  let bodyValidate = req.body;
  bodyValidate = await bodyService.bodyValidator(bodyValidate);

  if (!bodyValidate) {
    return res.status(400).json({ message: "Field required" });
  }

  if (req.file) {
    bodyValidate.picture = `public/upload/user/${req.file.filename.trim()}`;
  }

  User.findOne({
    where: {
      email: bodyValidate.email,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: "Email exist" });
      }

      passwordService
        .verifyPassword(bodyValidate.password)
        .then((result) => {
          if (result === false) {
            return res.status(400).json({ message: "Strong password require" });
          }
          bodyValidate.password = result;
          User.create(bodyValidate)
            .then((userCreated) => {
              res.status(201).json(userCreated);
            })
            .catch((error) => {
              console.log("error create", error);
            });
        })
        .catch((err) => console.log("error find", err));
    })
    .catch((err) => console.log("error find", err));
};

exports.user_login = async (req, res, next) => {
  let bodyValidate = req.body;
  bodyValidate = await bodyService.bodyValidator(bodyValidate);

  if (!bodyValidate) {
    return res.status(400).json({ message: "Field required" });
  }

  User.findOne({
    where: {
      email: bodyValidate.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Email or password invalid" });
      }

      bcrypt.compare(bodyValidate.password, user.password, (err, result) => {
        if (err) {
          throw err;
        }
        if (!result) {
          return res.status(401).json({ message: "Email or password invalid" });
        }
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            estateAgent: user.estateAgent,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.status(201).json({
          message: `${user.name} connected !`,
          token: token,
        });
      });
    })
    .catch((err) => console.log("error findOne", err));
};

exports.user_list = (req, res, next) => {
  User.findAll({
    attributes: ["id", "name", "picture"],
  })
    .then((users) => {
      if (users.length === 0) {
        return res.status(204).json({ message: "No users" });
      }
      res.status(201).json(users);
    })
    .catch((err) => console.log("error findAll", err));
};

exports.user_detail = (req, res, next) => {
  User.findByPk(req.params.id, {
    attributes: ["id", "name", "picture", "email", "age", "phone", "admin"],
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => console.log("error findByPk", err));
};

exports.user_update = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  let bodyValidate = req.body;
  bodyValidate = await bodyService.bodyValidator(bodyValidate);

  if (!bodyValidate) {
    return res.status(400).json({ message: "Field required" });
  }

  const decodedToken = tokenService.verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (
    decodedToken.admin === false &&
    decodedToken.id !== Number(req.params.id)
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      User.findOne({
        where: {
          email: bodyValidate.email,
        },
      })
        .then((userEmailExist) => {
          if (userEmailExist) {
            return res.status(409).json({ message: "Email exist" });
          }
          user
            .update(bodyValidate)
            .then((userUpdated) => {
              res.status(201).json(userUpdated);
            })
            .catch((error) => {
              console.log("error userUpdated", error);
            });
        })
        .catch((error) => {
          console.log("error userEmailExist", error);
        });
    })
    .catch((err) => console.log("error findOne", err));
};

exports.user_delete = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = tokenService.verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (
    decodedToken.admin === false &&
    decodedToken.id !== Number(req.params.id)
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      User.destroy({
        attributes: ["id", "name"],
        where: {
          id: user.id,
        },
      })
        .then(() => {
          res.status(201).json({ message: `User ${user.name} deleted` });
        })
        .catch((err) => console.log("error destroy", err));
    })
    .catch((err) => console.log("error findOne", err));
};
