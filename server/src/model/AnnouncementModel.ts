import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./UserModel";

export interface IAnnouncement extends Document {
  creator: IUser["_id"];
  name: string;
  course: string;
  announcementText: string;
  date: Date;
}

const announcementSchema: Schema<IAnnouncement> = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  announcementText: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const AnnouncementModel = mongoose.model<IAnnouncement>(
  "Announcement",
  announcementSchema
);

export default AnnouncementModel;
