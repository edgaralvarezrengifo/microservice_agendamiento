module.exports = app => {
    const order = require("../controllers/product.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", order.create);
    // Retrieve all Tutorials
    router.get("/", order.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", order.findOne);
    // Update a Tutorial with id
    router.put("/:id", order.update);
    // Delete a Tutorial with id
    app.use('/api/product', router);
  };