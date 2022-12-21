import { Schema, model } from "mongoose";

const testModule = new Schema({
  testName: String,
  quetions: [{ quetion: String, options: [String], correct: String }],
});

export default model("test", testModule);
