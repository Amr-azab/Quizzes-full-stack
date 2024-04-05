import { RequestHandler } from "express";
import { CustomRequest } from "../interfaces/customRequest";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import AnnouncementModel, { IAnnouncement } from "../model/AnnouncementModel";

export const createAnnouncement: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    // Only allow teachers to create announcements
    if (req.user?.role !== "teacher") {
      return next(new AppError("Only teachers can create announcements", 403));
    }

    const { name, course, announcementText } = req.body;

    const newAnnouncement: IAnnouncement = await AnnouncementModel.create({
      creator: req.user._id,
      name,
      course,
      announcementText,
    });

    res.status(201).json({
      status: "success",
      data: {
        announcement: newAnnouncement,
      },
    });
  }
);

export const getAnnouncements: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    // Allow both teachers and students to view announcements
    const announcements = await AnnouncementModel.find().populate(
      "creator",
      "name"
    ).sort({ date: -1 });;

    res.status(200).json({
      status: "success",
      data: {
        announcements,
      },
    });
  }
);

export const getAnnouncementById: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const AnnouncementId = req.params.AnnouncementId;
    console.log("Announcement ID:", AnnouncementId);

    const announcement = await AnnouncementModel.findById(
      AnnouncementId
    ).populate("creator", "name");

    if (!announcement) {
      return next(new AppError("Announcement not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        announcement,
      },
    });
  }
);
export const updateAnnouncementById: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const AnnouncementId = req.params.AnnouncementId;
    const existingannouncement = await AnnouncementModel.findById(
      AnnouncementId
    );

    if (!existingannouncement) {
      return next(new AppError("Announcement not found", 404));
    }
    if (existingannouncement.creator.toString() !== req.user?._id.toString()) {
      return next(
        new AppError("You are not authorized to update this annoucment", 403)
      );
    }
    const { name, course, announcementText } = req.body;

    const updateAnnouncement = await AnnouncementModel.findByIdAndUpdate(
      AnnouncementId,
      { name, course, announcementText },
      { new: true, runValidators: true }
    ).populate("creator", "name");

    res.status(200).json({
      status: "success",
      data: {
        updateAnnouncement,
      },
    });
  }
);
export const deleteAnnouncementById: RequestHandler = catchAsync(
  async (req: CustomRequest, res, next) => {
    const AnnouncementId = req.params.AnnouncementId;

    const existingannouncement = await AnnouncementModel.findById(
      AnnouncementId
    );

    if (!existingannouncement) {
      return next(new AppError("Announcement not found", 404));
    }
    if (existingannouncement.creator.toString() !== req.user?._id.toString()) {
      return next(
        new AppError("you are not authorized to delete this annoucment", 403)
      );
    }
    const deleteAnnouncement = await AnnouncementModel.findByIdAndDelete(
      AnnouncementId
    );

    res.status(200).json({
      status: "success",
      data: null,
    });
  }
);
