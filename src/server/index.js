import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import axios from "axios";

import router from "./router/index.js";

const app = express();
mongoose.set("strictQuery", false);
dotenv.config({ path: "../../.env" });

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
//CONSTs
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

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

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
};
start();
