import express from "express";
import {
  register,
  getMyProfile,
  login,
  logout
} from "./../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);

// wherever we want to protect the route, we can use the isAuth middleware
router.get("/me", isAuth, getMyProfile);

export default router;
