"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.protect = exports.login = exports.signup = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const UserModel_1 = __importDefault(require("../model/UserModel"));
const jsonwebtoken_1 = require("jsonwebtoken");
const signToken = (id, role) => {
    return (0, jsonwebtoken_1.sign)({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id, user.role);
    res.cookie("jwt", token, {
        expires: new Date(Date.now() +
            Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });
    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
}; // <-- Removed the colon and void here
exports.signup = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const newUser = await UserModel_1.default.create({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        role: req.body.role, // Add role here
    });
    createSendToken(newUser, 201, req, res);
});
const jwtVerifyPromisified = (token, secret) => {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.verify)(token, secret, {}, (err, payload) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payload);
            }
        });
    });
};
exports.login = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError_1.AppError("Please provide email or password!", 400));
    }
    const user = await UserModel_1.default.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new appError_1.AppError("incorrect email or password", 404));
    }
    createSendToken(user, 200, req, res);
});
exports.protect = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    // 1) check if token is there and if it exists
    let token = req.cookies.jwt;
    if (!token) {
        return next(new appError_1.AppError("please login to access this route", 401));
    }
    // 2) Verify Token
    const decoded = (await jwtVerifyPromisified(token, process.env.JWT_SECRET));
    // 3) check if user exist
    const currentUser = (await UserModel_1.default.findById(decoded.id));
    if (!currentUser) {
        return next(new appError_1.AppError("please login to access this route", 404));
    }
    req.user = currentUser;
    next();
});
exports.logout = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    res.cookie("jwt", "", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        status: "success",
        message: "logged out successfully",
    });
});
exports.getMe = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a;
    const user = await UserModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    res.status(200).json({
        status: "success",
        data: user,
    });
});
