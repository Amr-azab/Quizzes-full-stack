import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./UserModel";

export interface IQuiz extends Document {
  creator: IUser["_id"];
  title: string;
  course: string;
  topic: string;
  dueDate: Date;
  date: Date;
}

const quizSchema: Schema<IQuiz> = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const QuizModel = mongoose.model<IQuiz>("Quiz", quizSchema);

export default QuizModel;
