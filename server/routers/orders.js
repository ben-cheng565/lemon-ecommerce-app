import express from "express";
import Order from "../models/orders.js";
import { isAdmin, isAuth } from "../util.js";

const router = express.Router();

// fetch all orders
router.get("/list", isAuth, isAdmin, async (req, res) => {
  const orderList = await Order.find({}).populate("userId", "name");
  res.send(orderList);
});

// fetch all orders of an user
router.get("/history", isAuth, async (req, res) => {
  const orders = await Order.find({ userId: req.userInfo._id });
  res.send(orders);
});

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

router.put("/pay/:id", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const result = await order.save();
    res.send({ message: "Order Paid", order: result });
  } else {
    res.status(404).send({ message: "Order not Found" });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    const result = await order.remove();

    res.send({ message: "Order deleted successfully", order: result });
  } else {
    res.status(404).send("Order not Found");
  }
});

router.put("/deliver/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();

    const result = await order.save();
    res.send({ message: "Order Deliverd", order: result });
  } else {
    res.status(404).send({ message: "Order not Found" });
  }
});

export default router;
