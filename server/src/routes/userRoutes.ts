import express from "express";
import {
  login,
  protect,
  signup,
  logout,
  getMe,
} from "../controllers/userController";
export const router = express.Router();
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getMe").get(protect, getMe);
router.route("/logout").post(protect, logout);
