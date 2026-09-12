import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    productid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "productid should not be empty"],
    },
    quanity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "Product"
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
