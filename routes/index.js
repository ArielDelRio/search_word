var express = require("express");
var router = express.Router();
var renderToString = require("react-dom/server").renderToString;
var search_word = require("../controller/search_word.controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { name: "Express" });
});

router.get("/search", search_word);

module.exports = router;
