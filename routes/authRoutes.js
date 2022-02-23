import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15minutes
  max: 8,
  message: { message: "Too many requests. Try again later" },
});

import { register, login, updateUser } from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
