import express from "express";
import mongoose from "mongoose";
import Product from "./modles/productModle.mjs";

const app = express();
const URL =
  "mongodb+srv://dhinesh:2012428@readify.efo1rnz.mongodb.net/?appName=Readify";

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(express.json());
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(product)
    res.send(product);
  } catch (error) {
    console.log(error.message);
  }
});

function run() {
  try {
    const client = mongoose.connect(URL);
    console.log("Connnect to database");
    app.listen(3000, () => {
      console.log("App is running");
    });
  } catch (error) {
    console.log(error.message);
  }
}

run();
