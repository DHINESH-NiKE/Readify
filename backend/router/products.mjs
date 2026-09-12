import { Router } from "express";
import { productSchema } from "../utils/validationSchemas.mjs";
import Product from "../modles/productModle.mjs";

const router = Router();

router.get("/api/products", async (req, res) => {
  console.log(req.query);
  const { filter, value } = req.query;
  try {
    if (filter && value) {
      const result = await Product.find({ [filter]: value });
      res.status(200).send(result);
    } else {
      const result = await Product.find({});
      res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  //console.log(productId);
  try {
    const result = await Product.find({ _id: [productId] });
    result.length > 0 ? res.status(200).send(result) : res.status(400).send("Invaild ID")
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.post("/api/products", async (req, res) => {
  const { error, value } = productSchema.validate(req.body);
  if (!error) {
    const product = await Product.create(value);
    res.status(201).send(product);
  } else {
    res.status(400).send(error);
  }
});

export default router;
