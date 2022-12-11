import jwt from "jsonwebtoken";
import userSchema from "../module/user-module.js";

const SECRET_TOKEN = process.env.SECRET_TOKEN;

export const authToken = async (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["authorization"];
  if (!token) return res.json({ message: "No token" });
  const decoded = jwt.verify(token, "mynameisandrew");
  req.user = decoded;
  const user = await userSchema.findOne({ _id: req.user.id });
  req.user = user;
  next();
};
// http://localhost:5000/posts
("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTRhNjdiYWJiZDQzYzZjYWNmMjE2ZiIsImlhdCI6MTY3MDY4Njk4MCwiZXhwIjoxNjcwNzczMzgwfQ.uAPO5WQO80cJTcyXSM9UQp5XIkmaxLLFzgkys_oTwe4");
