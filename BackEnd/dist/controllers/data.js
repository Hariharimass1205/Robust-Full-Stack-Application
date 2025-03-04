"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviews = exports.getData = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usage, userGoal, rateUserValue, suggestion, birthday, Name } = req.body;
        if (!usage || !userGoal || !rateUserValue || !birthday || !Name) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const userLimit = yield userModel_1.default.find({ Name: Name }).countDocuments();
        if (userLimit >= 5) {
            return res.status(200).json({ limit: true, message: "User Limit reached" });
        }
        const rate = parseInt(rateUserValue, 10);
        const formattedBirthday = new Date(birthday).toISOString().split("T")[0];
        const newData = yield userModel_1.default.insertOne({
            usage,
            Name,
            userGoal,
            rateUserValue: rate,
            suggestion,
            birthday: formattedBirthday,
        });
        res.json({ success: true, message: "Data saved successfully", userdata: newData });
    }
    catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.getData = getData;
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield userModel_1.default.find({});
        res.status(200).json({ success: true, userDatas: data });
    }
    catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.getReviews = getReviews;
