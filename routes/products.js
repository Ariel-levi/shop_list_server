const express = require("express");
const { validateProduct, ProductModel } = require("../models/productModel");
const router = express.Router();

// get all products
router.get("/", async (req, res) => {
  try {
    let data = await ProductModel.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add new product
router.post("/", async (req, res) => {
  let validBody = validateProduct(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let product = new ProductModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// make product in_cart false OR true
router.put("/:idEdit/:tORf", async (req, res) => {
  try {
    let idEdit = req.params.idEdit;
    let tORf = req.params.tORf;
    let data = await ProductModel.updateOne({ _id: idEdit }, { in_cart: tORf });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// edit product
router.put("/:idEdit", async (req, res) => {
  let validBody = validateProduct(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let idEdit = req.params.idEdit;
    let data = await ProductModel.updateOne({ _id: idEdit }, req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// del product
router.delete("/:idDel", async (req, res) => {
  try {
    let idDel = req.params.idDel;
    let data = await ProductModel.deleteOne({ _id: idDel });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
