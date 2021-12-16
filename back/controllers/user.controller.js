const User = require("../models").User;
const passwordService = require("../services/password.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.user_add = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: "Email exist" });
      }

      passwordService.verifyPassword(req.body.password).then((result) => {
        if (result === false) {
          return res.status(400).json({ message: "Strong password require" });
        }

        let newUser = req.body;
        newUser.password = result;

        User.create(newUser)
          .then((userCreated) => {
            res.status(201).json(userCreated);
          })
          .catch((error) => {
            console.log("error create", error);
          });
      });
    })
    .catch((err) => console.log("error find", err));
};

exports.user_login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Email or password invalid" });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
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
        return res.status(404).json({ message: "No users" });
      }
      res.status(200).json(users);
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

exports.user_update = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const body = req.body;

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      throw err;
    }

    if (!body.email || !body.name || !body.age || !body.phone) {
      return res.status(400).json({ message: "Field required" });
    }

    if (decoded.admin === false && decoded.id !== Number(req.params.id)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    User.findByPk(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        User.findOne({
          where: {
            email: body.email,
          },
        })
          .then((userEmailExist) => {
            if (userEmailExist) {
              return res.status(409).json({ message: "Email exist" });
            }
            user
              .update(req.body)
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
  });
};

exports.user_delete = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      throw err;
    }

    if (decoded.admin === false && decoded.id !== Number(req.params.id)) {
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
  });
};
