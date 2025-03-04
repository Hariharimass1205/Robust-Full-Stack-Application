"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_1 = require("../controllers/data");
const router = (0, express_1.Router)();
router.post("/", data_1.getData);
router.get("/getData", data_1.getReviews);
exports.default = router;
