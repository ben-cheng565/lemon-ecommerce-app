import express from "express";
import Order from "../models/orders.js";
import { isAuth } from "../util.js";

const router = express.Router();

router.post("/", isAuth, async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty." });
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      userId: req.userInfo._id,
    });

    const result = await order.save();
    res.status(201).send({ message: "New order created", order: result });
  }
});

router.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order not Found." });
  }
});

export default router;
