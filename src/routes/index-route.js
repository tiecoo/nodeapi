const express = require("express");
var router = express.Router();

router.use(function (req, res, next) {
    console.log("Intercept by middleware");
    next();
});

module.exports = router;