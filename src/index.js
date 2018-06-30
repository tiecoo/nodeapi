var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var indexRoute = require("./routes/index-route");
var productRoute = require("./routes/products-route");
var customerRoute = require("./routes/customer-route");
var mongoose = require("mongoose");
var config = require("./config");
mongoose.connect(config.connectionString);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.port || 3000;
app.use("/api", indexRoute);
app.use("/customer", customerRoute);
app.use("/products", productRoute);

app.listen(port);
console.log("API server is up and running on port " + port);

