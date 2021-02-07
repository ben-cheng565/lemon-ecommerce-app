import express from "express";
import { data } from "../data.js";
import User from "../models/users.js";

const router = express.Router();

router.get("/init", async (req, res) => {
  // before initializing data, delete all user data in db
  await User.remove({});

  const createdUsers = await User.insertMany(data.users);

  res.send({ createdUsers });
});

export default router;
