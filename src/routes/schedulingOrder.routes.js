module.exports = app => {
    const scheduling = require("../controllers/schedulingOrders.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", scheduling.create);
    // Retrieve all Tutorials
    router.get("/", scheduling.findAll);
    // Retrieve a single Tutorial with id
    router.get("GetStatus/:id", scheduling.findOne);
    // Update a Tutorial with id
    router.put("CancelOrder/:id", scheduling.update);
    // Delete a Tutorial with id
    app.use('/api/scheduling', router);
  };