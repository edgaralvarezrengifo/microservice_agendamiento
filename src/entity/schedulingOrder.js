module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        SchedulNumber: String,
        orderNumber: String,
        DeliveryDate:String,
        Statatus: String,
        TransportaionSupplier : String,
        TrackingId : String
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const schedulingOrder = mongoose.model("schedulingorders", schema);
    return schedulingOrder;
  };