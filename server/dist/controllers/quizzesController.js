"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuiz = exports.updateQuiz = exports.getQuizzes = exports.createQuiz = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const QuizModel_1 = __importDefault(require("../model/QuizModel"));
exports.createQuiz = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a;
    // Only allow teachers to create quizzes
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "teacher") {
        return next(new appError_1.AppError("Only teachers can create quizzes", 403));
    }
    const { title, course, topic, dueDate } = req.body;
    const newQuiz = await QuizModel_1.default.create({
        creator: req.user._id,
        title,
        course,
        topic,
        dueDate,
    });
    res.status(201).json({
        status: "success",
        data: {
            quiz: newQuiz,
        },
    });
});
exports.getQuizzes = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    // Allow both teachers and students to view quizzes
    const quizzes = await QuizModel_1.default.find().populate("creator", "name");
    res.status(200).json({
        status: "success",
        data: {
            quizzes,
        },
    });
});
exports.updateQuiz = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a;
    const quizId = req.params.quizId;
    // Find the quiz by ID
    const existingQuiz = await QuizModel_1.default.findById(quizId);
    if (!existingQuiz) {
        return next(new appError_1.AppError("Quiz not found!", 404));
    }
    // Check if the logged-in user is the creator of the quiz
    if (existingQuiz.creator.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
        return next(new appError_1.AppError("You are not authorized to update this quiz", 403));
    }
    const { title, course, topic, dueDate } = req.body;
    const updatedQuiz = await QuizModel_1.default.findByIdAndUpdate(quizId, { title, course, topic, dueDate }, { new: true, runValidators: true }).populate("creator", "name");
    res.status(200).json({
        status: "success",
        data: {
            quiz: updatedQuiz,
        },
    });
});
exports.deleteQuiz = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a;
    const quizId = req.params.quizId;
    // Find the quiz by ID
    const existingQuiz = await QuizModel_1.default.findById(quizId);
    if (!existingQuiz) {
        return next(new appError_1.AppError("Quiz not found!", 404));
    }
    // Check if the logged-in user is the creator of the quiz
    if (existingQuiz.creator.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
        return next(new appError_1.AppError("You are not authorized to delete this quiz", 403));
    }
    // Delete the quiz
    await QuizModel_1.default.findByIdAndDelete(quizId);
    res.status(204).json({
        status: "success",
        data: null,
    });
});
