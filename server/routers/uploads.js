import express from "express";
import multer from "multer";
import { isAuth } from "../util.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage }).single("image");

router.post("/", isAuth, upload, (req, res) => {
  try {
    res.send(`${req.file.path}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
