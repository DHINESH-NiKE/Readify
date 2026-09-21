import mongoose from "mongoose";

const orderHistorySchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    numofproducts: {
      type: Number,
    },
    totalquantity: {
      type: Number,
    },
    orders: [
      {
        productid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        productname: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
          min: 1,
        },
        subtotal: {
          type: Number,
        },
      },
    ],
    itemstotal: {
      type: Number,
    },
    delivery: {
      type: String,
      enum: ["standard", "fast", "express"],
    },
    shippingcharges: {
      type: Number,
    },
    gst: {
      type: Number,
    },
    grandtotal: {
      type: Number,
    },
    ETA: {
      type: Number,
    },
  },
  {
    timestamps: true,
    collection: "orderHistory",
  },
);
