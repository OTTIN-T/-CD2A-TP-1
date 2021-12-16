const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.post("/", user_controller.user_add);
router.post("/login", user_controller.user_login);
router.get("/", auth(), user_controller.user_list);
router.get("/:id", auth(), user_controller.user_detail);
router.put("/:id", auth(), user_controller.user_update);
router.delete("/:id", auth(), user_controller.user_delete);
module.exports = router;
