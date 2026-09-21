import { Router } from "express";
import Cart from "../modles/cartModle.mjs";
import OrderHistory from "../modles/orderHistoryModel.mjs";

const router = Router();

router.post("/api/orderhistory", async (req, res) => {
  const userid = req.session.userId;

  if (!userid) {
    return res.status(401).json({
      message: "Please login before placing an order",
    });
  }

  const { delivery } = req.body;

  let shippingcharges = 0;
  const standardPrice = 0;
  const fastPrice = 99;
  const expressPrice = 149;

  try {
    if (!["standard", "fast", "express"].includes(delivery)) {
      return res.status(400).json({
        message: "Invalid delivery option",
      });
    }

    const cart = await Cart.find({}).populate("productid");
    if (cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let ETA;

    if (delivery === "standard") {
      shippingcharges = standardPrice;
      ETA = Date.now() + 7 * 24 * 60 * 60 * 1000;
    } else if (delivery === "fast") {
      shippingcharges = fastPrice;
      ETA = Date.now() + 4 * 24 * 60 * 60 * 1000;
    } else {
      shippingcharges = expressPrice;
      ETA = Date.now() + 1 * 24 * 60 * 60 * 1000;
    }
    let totalquantity = 0;
    let itemstotal = 0;

    const products = cart.map((cartitem) => {
      const productid = cartitem.productid._id;
      const productname = cartitem.productid.title;
      const price = cartitem.productid.price;
      const quantity = cartitem.quantity;

      totalquantity += quantity;
      const subtotal = price * quantity;
      itemstotal += subtotal;

      return {
        productid,
        productname,
        price,
        quantity,
        subtotal,
      };
    });

    const numofproducts = products.length;

    const gst = (itemstotal + shippingcharges) * 0.05;
    const grandtotal = itemstotal + shippingcharges + gst;

    const neworderhistory = await OrderHistory.create({
      userid,
      numofproducts,
      totalquantity,
      products,
      itemstotal,
      delivery,
      shippingcharges,
      gst,
      grandtotal,
      ETA,
    });

    await Cart.deleteMany({});

    res.status(201).json({
      message: "Order placed successfully",
      order: neworderhistory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
