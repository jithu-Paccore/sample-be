const { Product } = require("../models/products");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/getProduct", async (req, res) => {
  let prod = Product;
  let productList = []
  if(prod){
    productList = await Product.find()
  }

  if (!productList) {
    res.status(500).send({ success: false });
  }
  res.send(productList);
});

router.post("/addProduct", async (req, res) => {
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  product = await product.save();

  if (!product) {
    return res.status(500).send("The product cannot be created");
  } else {
    res.send(product);
  }
});

module.exports = router;
