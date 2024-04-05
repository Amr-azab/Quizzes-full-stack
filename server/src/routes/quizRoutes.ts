import express from "express";
import { protect } from "../controllers/userController";
import {
  createQuiz,
  getQuizzes,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizzesController";

export const router = express.Router();

router.route("/createQuiz").post(protect, createQuiz);
router.route("/getQuizzes").get(protect, getQuizzes);
router.route("/updateQuiz/:quizId").put(protect, updateQuiz);
router.route("/deleteQuiz/:quizId").delete(protect, deleteQuiz);
