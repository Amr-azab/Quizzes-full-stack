"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const quizzesController_1 = require("../controllers/quizzesController");
exports.router = express_1.default.Router();
exports.router.route("/createQuiz").post(userController_1.protect, quizzesController_1.createQuiz);
exports.router.route("/getQuizzes").get(userController_1.protect, quizzesController_1.getQuizzes);
exports.router.route("/updateQuiz/:quizId").put(userController_1.protect, quizzesController_1.updateQuiz);
exports.router.route("/deleteQuiz/:quizId").delete(userController_1.protect, quizzesController_1.deleteQuiz);
