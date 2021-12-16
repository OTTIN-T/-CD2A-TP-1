const express = require("express");
const router = express.Router();

const tag_controller = require("../controllers/tag.controller");

router.post("/", tag_controller.tag_add);
router.get("/", tag_controller.tag_list);
router.get("/:id", tag_controller.tag_detail);
router.put("/:id", tag_controller.tag_update);
router.delete("/:id", tag_controller.tag_delete);

module.exports = router;
