import { Router } from "express";
import { cartSchema, cartPatchSchema } from "../utils/validationSchemas.mjs";
import Cart from "../modles/cartModle.mjs";

const router = Router();

router.get("/api/cart", async (req, res) => {
  try {
    let cart;

    if (req.query.expand === "products") {
      cart = await Cart.find({}).populate("productid");
    } else {
      cart = await Cart.find({});
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/api/cart", async (req, res) => {
  const { error, value } = cartSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const { productid } = value;

  try {
    let cart = await Cart.findOne({ productid });
    if (cart) {
      cart.quantity += 1;
      await cart.save();
      return res.status(200).send(cart);
    }
    cart = await Cart.create(value);
    res.status(201).send(cart);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.put("/api/cart/:id", async (req, res) => {
  const { error, value } = cartPatchSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const { quantitychange } = value;
  const cartId = req.params.id;

  try {
    let cartItem = await Cart.findById(cartId);

    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    if (cartItem.quantity === 1 && quantitychange === -1) {
      cartItem = await Cart.findByIdAndDelete(cartId);
      return res.status(200).send(cartItem);
    }

    cartItem.quantity += quantitychange;
    await cartItem.save();

    return res.status(200).send(cartItem);
  } catch (error) {
    return res.status(400).send(error);
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
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/api/cart/payment", async (req, res) => {
  const { delivery } = req.body;
  let itemsTotal = 0;
  let shipping = 0;

  const standardPrice = 0;
  const estimatedDeliveryTimeMsS = Date.now() + 7 * 24 * 60 * 60 * 1000;

  const fastPrice = 99;
  const estimatedDeliveryTimeMsF = Date.now() + 4 * 24 * 60 * 60 * 1000;

  const expressPrice = 149;
  const estimatedDeliveryTimeMsE = Date.now() + 1 * 24 * 60 * 60 * 1000;

  try {
    if (!["standard", "fast", "express"].includes(delivery)) {
      return res.status(400).json({
        error: "Invalid delivery option",
      });
    }

    const cart = await Cart.find({}).populate("productid");
    for (const item of cart) {
      const productPrice = item.productid.price;
      itemsTotal += productPrice * item.quantity;
    }

    if (delivery === "standard") {
      shipping = standardPrice;
    } else if (delivery === "fast") {
      shipping = fastPrice;
    } else if (delivery === "express") {
      shipping = expressPrice;
    }

    const totalBeforeTax = itemsTotal + shipping;
    const gst = totalBeforeTax * 0.05;
    const grandTotal = totalBeforeTax + gst;

    res.status(200).json({
      standardPrice,
      estimatedDeliveryTimeMsS,
      fastPrice,
      estimatedDeliveryTimeMsF,
      expressPrice,
      estimatedDeliveryTimeMsE,
      itemsTotal,
      shipping,
      totalBeforeTax,
      gst,
      grandTotal,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
