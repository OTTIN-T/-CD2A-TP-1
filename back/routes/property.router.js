const express = require("express");
const router = express.Router();
const multer = require("multer");

const property_controller = require("../controllers/property.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload/property");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("picture"), property_controller.property_add);
router.get("/", property_controller.property_list);
router.get("/:id", property_controller.property_detail);
router.put(
  "/:id",
  upload.single("picture"),
  property_controller.property_update
);
router.delete("/:id", property_controller.property_delete);

module.exports = router;
