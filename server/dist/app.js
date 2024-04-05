"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const userRoutes_1 = require("./routes/userRoutes");
const annoucementRoutes_1 = require("./routes/annoucementRoutes");
const quizRoutes_1 = require("./routes/quizRoutes");
const app = (0, express_1.default)();
app.enable("trust proxy");
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.options("*", (0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/coligo/user", userRoutes_1.router);
app.use("/api/coligo/quiz", quizRoutes_1.router);
app.use("/api/coligo/annoucment", annoucementRoutes_1.router);
app.use(express_1.default.static(`${__dirname}/build`));
app.all("*", (req, res, next) => {
    res.sendFile(`${__dirname}/build/index.html`);
});
app.use(errorController_1.default);
exports.default = app;
