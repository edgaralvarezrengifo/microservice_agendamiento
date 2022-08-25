const db = require("../entity");
const Order = db.orders;
// Create and Save a new orer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.orderNumber) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    
    // Create a new order
    const order = new Order({
        orderNumber:req.body.orderNumber,
        orderDate: req.body.orderDate,
        city: req.body.city,
        addres:req.body.addres,
        complementAddress: req.body.complementAddress,
        customerName: req.body.customerName,
        phone: req.body.phone,
        email: req.body.email,
        products :req.body.products
    });
    // Save Tutorial in the database
    order
      .save(order)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    order.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    order.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update order with id=${id}. Maybe order was not found!`
            });
          } else res.send({ message: "order was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating order with id=" + id
          });
        });
};

