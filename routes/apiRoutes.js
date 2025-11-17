const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/categoryController.js");
const productController = require("../Controllers/productController");
const apiKey = require("../middleware/apiKey");

    router.post("/categories/", apiKey, categoryController.Create);
    router.get("/categories/", categoryController.Index);
    router.get("/categories/:id", categoryController.Show);
    router.put("/categories/:id", apiKey, categoryController.Update);
    router.delete("/categories/:id", apiKey, categoryController.Delete);

    router.post("/products/", apiKey, productController.Create);
    router.get("/products/", productController.Index);
    router.get("/products/:id", productController.Show);
    router.put("/products/:id", apiKey, productController.Update);
    router.delete("/products/:id", apiKey, productController.Delete);

module.exports = router;