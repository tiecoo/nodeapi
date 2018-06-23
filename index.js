var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Product = require("./src/models/product");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/crud_api");

var router = express.Router();
router.use(function(req, res, next) {
  console.log("Intercept by middleware");
  next();
});
router.get("/", function(req, res) {
  res.json({ message: "It's working" });
});
router
  .route("/product")
  .post(function(req, res) {
    var product = new Product(req.body);
    product
      .save()
      .then(function(data) {
        res.json({ product: data });
      })
      .catch(function(err) {
        res.status(400).json({ errors: err });
      });
  })
  .get(function(req, res) {
    Product.find()
      .then(function(data) {
        res.json({ all: data });
      })
      .catch(function(err) {
        res.status(400).json({ errors: { message: "cannot make findAll" } });
      });
  });

var port = process.env.port || 3000;
app.use("/api", router);

app.listen(port);
console.log("API server is up and running on port " + port);
