var Product = require("../app/models/product");

exports.get = async () => {
    return await Product.find();
}

exports.createProduct = async (req) => {
    var product = new Product(req.body);
    return await product
        .save()
        .then(function (data) {
            return data
        })
        .catch(function (err) {
            return data
        });
}

exports.getProduct = async (id) => {
    return await Product.findById(id)
        .then(function (doc) {
            return doc
        })
        .catch(function (err) {
            return err
        })
}

exports.deleteProduct = async (id) => {
    return await Product.findByIdAndRemove(id)
        .then(function (doc) {
            return doc
        })
        .catch(function (error) {
            return error
        })
}

exports.updateProduct = async (id, body) => {
    return await Product.findByIdAndUpdate(id, body, { new: true })
        .then(function (doc) {
            return doc
        })
        .catch(function (err) {
            return err
        })
}