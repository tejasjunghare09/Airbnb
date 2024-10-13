

const express = require("express");
const fs = require("node:fs");

const router = express.Router();

router.get("/:imageName", (request, response) => {
  const { imageName } = request.params;
  const path = __dirname + "/../images/" + imageName;
  const data = fs.readFileSync(path);
  response.send(data);
});

module.exports = router;
