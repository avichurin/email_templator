let express = require("express");
let router = express.Router();

const documents = require("./documents");
const images = require("./images");
const strings = require("./strings");

router.use("/documents", documents);
router.use("/strings", strings);
router.use("/assets/images", images);

module.exports = router;
