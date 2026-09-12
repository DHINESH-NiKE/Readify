import { Router } from "express";
import { cartSchema, cartPatchSchema } from "../utils/validationSchemas.mjs";
import Cart from "../modles/cartModle.mjs";

const router = Router();

router.get("/api/cart", async (req, res) => {
  try {
    const cart = await Cart.find({});
    cart.length > 0
      ? res.status(200).send(cart)
      : res.status(200).send("No Products in cart");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/api/cart", async (req, res) => {
  const { error, value } = cartSchema.validate(req.body);
  if (!error) {
    //console.log(value, value.productid);
    try {
      const cart = await Cart.create(value);
      res.status(201).send(cart);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  } else {
    res.status(400).send(error);
  }
});

router.patch("/api/cart/:id", async (req, res) => {
  const { error, value } = cartPatchSchema.validate(req.body);
  const { cartId, quanitychange } = value;
  if (error) {
    return res.status(400).send(error);
  }

  try {
    const cartItem = await Cart.findById(cartId);

    if (!cartItem) {
      return res.status(404).send("Product not found in cart");
    }

    if (cartItem.quanity === 1 && quanitychange === -1) {
      cartItem.quanity = 1;
    } else {
      cartItem.quanity += quanitychange;
    }

    await cartItem.save();

    res.status(200).send(cartItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/api/cart/:id", async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await Cart.deleteOne({
      _id: cartId,
    });
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

router.delete("/api/cart", async (req, res) => {
  try {
    const cart = await Cart.deleteMany({});
    res.status(201).send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
