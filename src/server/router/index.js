import { Router } from "express";
import {
  registration,
  login,
  logout,
  refresh,
  getUsers,
  activate,
} from "../controllers/user-controller.js";

const router = new Router();

router.post("/registartion", registration);
router.post("/login", login);
router.post("/logout", logout);

router.get("/activate/:link", activate);
router.get("/refresh", refresh);
router.get("/users", getUsers);

export default router;
