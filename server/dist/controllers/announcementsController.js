"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncementById = exports.updateAnnouncementById = exports.getAnnouncementById = exports.getAnnouncements = exports.createAnnouncement = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const AnnouncementModel_1 = __importDefault(require("../model/AnnouncementModel"));
exports.createAnnouncement = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a;
    // Only allow teachers to create announcements
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "teacher") {
        return next(new appError_1.AppError("Only teachers can create announcements", 403));
    }
    const { name, course, announcementText } = req.body;
    const newAnnouncement = await AnnouncementModel_1.default.create({
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
});
exports.getAnnouncements = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    // Allow both teachers and students to view announcements
    const announcements = await AnnouncementModel_1.default.find().populate("creator", "name").sort({ date: -1 });
    ;
    res.status(200).json({
        status: "success",
        data: {
            announcements,
        },
    });
});
exports.getAnnouncementById = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const AnnouncementId = req.params.AnnouncementId;
    console.log("Announcement ID:", AnnouncementId);
    const announcement = await AnnouncementModel_1.default.findById(AnnouncementId).populate("creator", "name");
    if (!announcement) {
        return next(new appError_1.AppError("Announcement not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            announcement,
        },
    });
});
exports.updateAnnouncementById = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a;
    const AnnouncementId = req.params.AnnouncementId;
    const existingannouncement = await AnnouncementModel_1.default.findById(AnnouncementId);
    if (!existingannouncement) {
        return next(new appError_1.AppError("Announcement not found", 404));
    }
    if (existingannouncement.creator.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
        return next(new appError_1.AppError("You are not authorized to update this annoucment", 403));
    }
    const { name, course, announcementText } = req.body;
    const updateAnnouncement = await AnnouncementModel_1.default.findByIdAndUpdate(AnnouncementId, { name, course, announcementText }, { new: true, runValidators: true }).populate("creator", "name");
    res.status(200).json({
        status: "success",
        data: {
            updateAnnouncement,
        },
    });
});
exports.deleteAnnouncementById = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a;
    const AnnouncementId = req.params.AnnouncementId;
    const existingannouncement = await AnnouncementModel_1.default.findById(AnnouncementId);
    if (!existingannouncement) {
        return next(new appError_1.AppError("Announcement not found", 404));
    }
    if (existingannouncement.creator.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
        return next(new appError_1.AppError("you are not authorized to delete this annoucment", 403));
    }
    const deleteAnnouncement = await AnnouncementModel_1.default.findByIdAndDelete(AnnouncementId);
    res.status(200).json({
        status: "success",
        data: null,
    });
});
