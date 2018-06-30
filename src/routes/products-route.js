const express = require("express");
const authService = require("../services/auth-service");
var router = express.Router();
const controller = require("../controllers/product-controller");

router
    .get("/", authService.authorize, controller.getAll)
    .post("/", authService.authorize,controller.createProduct)
    .get("/:productId", authService.authorize,controller.getById)
    .put("/:productId", authService.authorize,controller.update)
    .delete("/:productId", authService.authorize,controller.delete);

module.exports = router;