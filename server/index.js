const express = require("express");
const app = express();
var cors = require("cors");
const port = 4003;
const bodyParser = require("body-parser");
const api = require("./api/routes/api");

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.use("/api", api);

app.listen(port, () => {
  console.log(`App launching at http://localhost:${port}`);
});
