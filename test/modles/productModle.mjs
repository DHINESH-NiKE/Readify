import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter the Title"],
  },
  author: {
    type: String,
    required: [true, "please enter the Author Name"],
  },
  price: {
    type: Number,
    min: 0,
    required: [true, "please enter the Price"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  purchase: {
    type: Number,
    default: 0,
  },
  keyword: {
    type: [String],
    required: [true, "please enter No of Purchases"],
  },
  image: {
    type: String,
    required: [true, "please enter Image url"],
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("productTest",productSchema);

export default  Product;