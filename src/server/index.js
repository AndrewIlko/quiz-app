import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import jwt from "jsonwebtoken";

const app = express();
mongoose.set("strictQuery", false);
dotenv.config({ path: "../../.env" });

app.use(cors());
app.use(express.json());

import userSchema from "./module/user-module.js";
import { authToken } from "./middleware/authToken.js";
//CONSTs
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const steamResp = async ({ gun, name, wear }) => {
  let data = null;
  try {
    await axios
      .get(
        `https://steamcommunity.com/market/listings/730/${gun}%20%7C%20${name}%20%28${wear}%29/render?start=0&count=5&currency=3&language=english&format=json`
      )
      .then((res) => res.data)
      .then((res) => (data = res.listinginfo));
  } catch (error) {
    console.log(error);
  }
  return data;
};
app.get("/skin/:gun/:name/:wear/", async (req, res) => {
  const data = await steamResp(req.params);
  //   .map(
  //     (id) =>
  //       `steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20M${i}A${listingItems[i].asset.id}D2452856983064439746`
  //   );
  res.json(data);
});

app.post("/registration", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await userSchema.findOne({ email });
    if (isExist) {
      return res.json({ message: "User with this email already exist" });
    }
    const user = new userSchema({ email: email.toLowerCase(), password });
    await user.save();
    res.json(user);
  } catch (e) {
    console.log(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.json({ message: "Register first." });
    }
    if (user.password != password) {
      return res.json({ message: "Register first." });
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_TOKEN, { expiresIn: "24h" });

    res.json(token);
  } catch (e) {
    console.log(e);
  }
});

app.get("/posts", authToken, async (req, res) => {
  res.json({ user: req.user });
});

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
};
start();
