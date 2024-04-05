import { RequestHandler } from "express";
import { CustomRequest } from "../interfaces/customRequest";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import QuizModel, { IQuiz } from "../model/QuizModel";
import UserModel from "../model/UserModel";

export const createQuiz: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    // Only allow teachers to create quizzes
    if (req.user?.role !== "teacher") {
      return next(new AppError("Only teachers can create quizzes", 403));
    }

    const { title, course, topic, dueDate } = req.body;

    const newQuiz: IQuiz = await QuizModel.create({
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
  }
);

export const getQuizzes: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    // Allow both teachers and students to view quizzes
    const quizzes = await QuizModel.find().populate("creator", "name");

    res.status(200).json({
      status: "success",
      data: {
        quizzes,
      },
    });
  }
);
export const updateQuiz: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const quizId = req.params.quizId;

    // Find the quiz by ID
    const existingQuiz = await QuizModel.findById(quizId);
    if (!existingQuiz) {
      return next(new AppError("Quiz not found!", 404));
    }

    // Check if the logged-in user is the creator of the quiz
    if (existingQuiz.creator.toString() !== req.user?._id.toString()) {
      return next(
        new AppError("You are not authorized to update this quiz", 403)
      );
    }

    const { title, course, topic, dueDate } = req.body;

    const updatedQuiz = await QuizModel.findByIdAndUpdate(
      quizId,
      { title, course, topic, dueDate },
      { new: true, runValidators: true }
    ).populate("creator", "name");

    res.status(200).json({
      status: "success",
      data: {
        quiz: updatedQuiz,
      },
    });
  }
);

export const deleteQuiz: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const quizId = req.params.quizId;

    // Find the quiz by ID
    const existingQuiz = await QuizModel.findById(quizId);
    if (!existingQuiz) {
      return next(new AppError("Quiz not found!", 404));
    }

    // Check if the logged-in user is the creator of the quiz
    if (existingQuiz.creator.toString() !== req.user?._id.toString()) {
      return next(
        new AppError("You are not authorized to delete this quiz", 403)
      );
    }

    // Delete the quiz
    await QuizModel.findByIdAndDelete(quizId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
