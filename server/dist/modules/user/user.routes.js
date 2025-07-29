"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const user_dto_1 = require("../../dto/user.dto");
const router = express_1.default.Router();
router.get("/", user_controller_1.getAllUsers);
router.post("/", (0, validation_middleware_1.validateRequestBody)(user_dto_1.CreateUserSchema), user_controller_1.createUser);
exports.default = router;
