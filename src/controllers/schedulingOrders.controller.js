const db = require("../entity");
const schedulingOrder = db.scheduling;
const ip = require("ip");
const ipaddress =ip.address();
// Create and Save a new Tutorial
exports.create = async(req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body.orderNumber) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    //call api Delivery


    const body = JSON.stringify({regex: "\\w{6,6}","records": 1});

    const axios = require('axios');

    var response= await  axios
      .post('https://random.api.randomkey.io/v1/regex',
            body,
            {headers: {'Content-Type': 'application/json','auth': '2990d21d608e209b0e6989f7d0d8e6ba'}});

      const data =response.data;

      console.log(data);

      if ( typeof data == 'undefined') {
        res.status(400).send({ message: "Proveedor de entregas no responde" });
        return;
      }
      
    // Create a scheduler
    const SchedulingOrder = new schedulingOrder({
     
      SchedulNumber: data.regex,
      orderNumber: req.body.title,
      DeliveryDate:req.body.orderDate,
      Statatus: "In progress",
      TransportaionSupplier : "ServiEntrega",
      TrackingId : data.regex
    });
    // Save Tutorial in the database
    SchedulingOrder
      .save(SchedulingOrder)
      .then(data => {
        res.status(200).send({data,ipserver:ipaddress});
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
    schedulingOrder.find(condition)
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
    schedulingOrder.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send({data,ipserver:ipaddress});
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
      schedulingOrder.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

