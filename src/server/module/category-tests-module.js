import { Schema, model } from "mongoose";

const categoryTestsSchema = new Schema({
  id: String,
  tests: [String],
});

export default model("categoryTest", categoryTestsSchema);
