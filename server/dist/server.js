"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const port = 8000;
dotenv_1.default.config();
const mongoDB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose_1.default
    .connect(mongoDB)
    .then(() => console.log("DB connection successfull !"));
app_1.default.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
