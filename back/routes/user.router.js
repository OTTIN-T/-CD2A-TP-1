const express = require("express");
const router = express.Router();
const multer = require("multer");

const user_controller = require("../controllers/user.controller");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload/user");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("picture"), user_controller.user_add);
router.post("/login", user_controller.user_login);
router.get("/", auth(), user_controller.user_list);
router.get("/:id", auth(), user_controller.user_detail);
router.put(
  "/:id",
  auth(),
  upload.single("picture"),
  user_controller.user_update
);
router.delete("/:id", auth(), user_controller.user_delete);
module.exports = router;
