let express = require("express");
let router = express.Router();
let StringsController = require("../controllers/string");

router.delete("/:string", StringsController.delete);

module.exports = router;
