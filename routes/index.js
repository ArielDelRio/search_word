var express = require("express");
var router = express.Router();
var search_word = require("../controller/search_word.controller");

/* GET home page. */
router.get("/test", function (req, res, next) {
  res.json({ message: "ok" }).status(200);
});

router.get("/search", search_word);

module.exports = router;
