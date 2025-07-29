"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.authGuard, product_controller_1.createProduct);
router.get("/", product_controller_1.getProducts);
exports.default = router;
