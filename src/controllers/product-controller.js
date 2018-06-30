var repository = require("../repositories/product-repository");

exports.getAll = async function (req, res) {
    try {
        let data = await repository.get();
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.createProduct = async function (req, res) {
    try {
        let data = await repository.createProduct(req);
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getById = async function (req, res) {
    try {
        let data = await repository.getProduct(req.params.productId);
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.update = async function (req, res) {
    try {
        let data = await repository.updateProduct(req.params.productId, req.body);
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }    
}

exports.delete = async function (req, res) {
    try {
        let data = await repository.deleteProduct(req.params.productId);
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
}