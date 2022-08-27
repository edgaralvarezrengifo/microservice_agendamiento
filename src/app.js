"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
var port = 80;
app.use(cors({
    origin: ['*']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var db = require("./entity");
db.mongoose
    .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () {
    console.log("Connected to the database!");
})
    .catch(function (err) {
    console.log("Cannot connect to the database!", err);
    process.exit();
});
require("./routes/order.routes")(app);
require("./routes/product.routes")(app);
require("./routes/schedulingOrder.routes")(app);
    
app.listen(port);
