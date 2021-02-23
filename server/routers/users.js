import express from "express";
import bcrypt from "bcryptjs";
// import { data } from "../data.js";
import User from "../models/users.js";
import { generateToken, isAdmin, isAuth } from "../util.js";

const router = express.Router();

const decodedPassword = await bcrypt.hash("123", 10);
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

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User not Found" });
  }
});

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

router.get("/", isAuth, isAdmin, async (req, res) => {
  const users = await User.find({});

  res.send(users);
});

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
