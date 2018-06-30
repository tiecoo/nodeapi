var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Product = require("./src/models/product");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://172.17.0.2/crud_api");

var router = express.Router();
router.use(function (req, res, next) {
  console.log("Intercept by middleware");
  next();
});
router.get("/", function (req, res) {
  res.json({ message: "It's working" });
});

router
  .route("/product")
  .post(function (req, res) {
    var product = new Product(req.body);
    product
      .save()
      .then(function (data) {
        res.json({ product: data });
      })
      .catch(function (err) {
        res.status(400).json({ errors: err });
      });
  })
  .get(function (req, res) {
    Product.find({}, "description")
      .then(function (data) {
        res.json({ all: data });
      })
      .catch(function (err) {
        res.status(400).json({ errors: { message: "cannot make findAll" } });
      });
  });

router
  .route("/product/:productId")
  .get(function (req, res) {
    let id = req.params.productId;
    Product.findById(id)
      .then(function (doc) {
        res.json({ doc: doc });
      })
      .catch(function (err) {
        res.status(400).json({ errors: { message: "cannot find this object" } });
      })
  })
  .delete(function (req, res) {
    let id = req.params.productId;
    Product.findByIdAndRemove(id)
      .then(function (doc) {
        res.json({ msg: "remove succed" });
      })
      .catch(function (error) {
        res.status(400).json({ errors: { message: "cannot remove this object" } });
      })
  })
  .put(function (req, res) {
    let id = req.params.productId;
    let doc = req.body;
    Product.findByIdAndUpdate(id, req.body, { new: true })
      .then(function (doc) {
        res.json({ updated: doc })
      })
      .catch(function (err) {
        res.json({ msg: "Nao foi possuvel atualizar", error: err });
      })
  })

var port = process.env.port || 3000;
app.use("/api", router);

app.listen(port);
console.log("API server is up and running on port " + port);
