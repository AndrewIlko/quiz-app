import jwt from "jsonwebtoken";
import userSchema from "../module/user-module.js";

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
