let express = require("express");
let router = express.Router();
let DocumentController = require("../controllers/document");

router.get("/", DocumentController.list);
router.post("/", DocumentController.save);
router.get("/:document", DocumentController.read);
router.delete("/:document", DocumentController.delete);

module.exports = router;
