

module.exports = mongoose => {
    var schemaproduct = mongoose.Schema(
        {
          name: String,
          image: String,
          quantiy: Number
        },
        { timestamps: true }
      );
    
    var schema = mongoose.Schema(
      {
        orderNumber: String,
        orderDate: String,
        city: String,
        addres:String,
        complementAddress: String,
        customerName: String,
        phone: Number,
        email: String,
        products : [schemaproduct]
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const order = mongoose.model("orders", schema);
    return order;
  };