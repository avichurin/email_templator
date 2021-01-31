let express = require("express");
let router = express.Router();
let ImagesController = require("../controllers/image");

router.get("/", ImagesController.list);
router.post("/", ImagesController.save);
router.delete("/:image", ImagesController.delete);
module.exports = router;
