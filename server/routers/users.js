import express from "express";
import bcrypt from "bcryptjs";
import { data } from "../data.js";
import User from "../models/users.js";
import { generateToken, isAdmin, isAuth } from "../util.js";

const router = express.Router();

// Create the default password for dummy data
const decodedPassword = bcrypt.hash("123", 10);
// Init some dummy user data for db
const dummyData = {
  users: [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: decodedPassword,
      isAdmin: true,
    },
    {
      name: "user",
      email: "user@gmail.com",
      password: decodedPassword,
      isAdmin: false,
    },
  ],
};

// Init user table in db using dummy data
router.get("/init", async (req, res) => {
  // before initializing data, delete all user data in db
  await User.remove({});

  const createdUsers = await User.insertMany(dummyData.users);

  res.send({ createdUsers });
});

// sign in api
router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(401).send({ message: "Invalid email address" });
    return;
  }

  const isEqual = await bcrypt.compare(req.body.password, user.password);
  if (!isEqual) {
    res.status(401).send({ message: "Invalid password" });
    return;
  }

  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
});

// Sign up api
router.post("/signup", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });

  const result = await user.save();
  res.send({
    _id: result._id,
    name: result.name,
    email: result.email,
    isAdmin: result.isAdmin,
    token: generateToken(result),
  });
});

// Get a specific user info
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User not Found" });
  }
});

// Update user profile info
router.put("/profile", isAuth, async (req, res) => {
  const user = await User.findById(req.userInfo._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const result = await user.save();
    res.send({
      _id: result._id,
      name: result.name,
      email: result.email,
      isAdmin: result.isAdmin,
      token: generateToken(result),
    });
  }
});

// Get all users
router.get("/", isAuth, isAdmin, async (req, res) => {
  const users = await User.find({});

  res.send(users);
});

// Delete a specific user
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400).send({ message: "Can not delete admin user" });
      return;
    }
    const result = await user.remove();

    res.send({ message: "User deleted successfully", user: result });
  } else {
    res.status(404).send("User not Found");
  }
});

// Update a specific user info
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isSeller = req.body.isSeller || user.isSeller;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const result = await user.save();
    res.send({ message: "User edited successfully", user: result });
  } else {
    res.status(404).send("User not Found");
  }
});

export default router;
