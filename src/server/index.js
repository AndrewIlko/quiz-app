import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import jwt from "jsonwebtoken";

import bodyParser from "body-parser";

const app = express();
mongoose.set("strictQuery", false);
dotenv.config({ path: "../../.env" });

var jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 20,
  type: "application/json",
});
var urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20,
  type: "application/x-www-form-urlencoded",
});

app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors());
app.use(express.json());

import userSchema from "./module/user-module.js";
import categorySchema from "./module/category-module.js";
import testSchema from "./module/test-module.js";

import { authToken } from "./middleware/authToken.js";
//CONSTs
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

app.post("/registration", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await userSchema.findOne({ email });
    if (isExist) {
      return res.json({ message: "User with this email already exist" });
    }
    const user = new userSchema({
      email: email.toLowerCase(),
      password,
      image: "",
    });
    await user.save();
    res.json({ message: "Successfully registered!" });
  } catch (e) {
    console.log(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user || user.password != password) {
      return res.json({ message: "Incorrect username or password." });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_TOKEN, { expiresIn: "12h" });
    res.json({ token: token });
  } catch (e) {
    console.log(e);
  }
});

app.get("/get-user", authToken, async (req, res) => {
  const { _id } = req.user;
  const user = await userSchema.findById(_id);
  res.json(user);
});

app.post("/profile-image", authToken, async (req, res) => {
  const { _id } = req.user;
  const imgUrl = req.body.url;
  const user = await userSchema.findById(_id);
  user["image"] = imgUrl;
  await user.save();
  res.json({ message: "Image has been saved" });
});

app.get("/quiz-categories", async (req, res) => {
  const categories = await categorySchema.find();
  res.json(categories);
});

app.get("/quiz-categories/:id", authToken, async (req, res) => {
  const categoryId = req.params.id;
  const category = await categorySchema.findById(categoryId);
  const testIdList = category.tests;
  let testList = [];
  for (let id of testIdList) {
    const test = await testSchema.findById(id);
    testList.push(test);
  }
  const testNameId = testList.map((test) => {
    return { name: test.testName, id: test._id };
  });
  return res.json(testNameId);
});

app.get("/quiz/:id", async (req, res) => {
  const id = req.params.id;
  const test = await testSchema.findById(id);
  res.json(test);
});

app.post("/quiz/:id", authToken, async (req, res) => {
  const { id } = req.params;
  const quizName = await testSchema.findById(id).testName;
  const user = await userSchema.findById(req.user._id);
  const isSaved = user.quizes.find((quiz) => quiz.id == id);
  if (isSaved) {
    const result = req.body.result;
    if (isSaved.result < result) {
      isSaved.result = result;
    }
  } else {
    user.quizes.push({ name: quizName, id: id, result: req.body.result });
  }
  await user.save();
  res.json({ message: "Your result is saved" });
});

app.get("/quiz-results", authToken, async (req, res) => {
  const user = await userSchema.findById(req.user._id);
  const result = [];
  for (let quiz of user.quizes) {
    const object = {};
    const test = await testSchema.findById(quiz.id);
    object.name = test.testName;
    object.result = Number(quiz.result);
    object.optionsCount = test.quetions.length;
    object.id = quiz.id;
    result.push(object);
  }
  res.json(result);
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
