const express = require("express");
const { uploadDogPic, deleteDogPic, updateDogPic, getDogPic, listDogPics } = require("./controllers/dogController");
const upload = require("./middlewares/upload");
const authenticateApiKey = require("./middlewares/authenticate");

const router = express.Router();

router.post("/upload", authenticateApiKey, upload.single("image"), uploadDogPic);
router.delete("/:id", authenticateApiKey, deleteDogPic);
router.put("/:id", authenticateApiKey, upload.single("image"), updateDogPic);
router.get("/:id", authenticateApiKey, getDogPic);
router.get("/", authenticateApiKey, listDogPics);

module.exports = router;