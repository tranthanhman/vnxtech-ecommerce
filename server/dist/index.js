"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./config/prisma");
const app_1 = require("./app");
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = process.env.PORT || 8090;
const startServer = async () => {
    try {
        console.log("🔄 Starting server...");
        // Kết nối database (optional)
        try {
            await prisma_1.prisma.$connect();
            console.log("✅ Database connected");
        }
        catch (dbError) {
            console.log("⚠️ Database connection failed, continuing without DB");
        }
        app_1.httpServer.listen(PORT, () => {
            logger_1.default.info(`📑 Visit the documentation at: http://localhost:${process.env.PORT || 8080}`);
            logger_1.default.info("⚙️  Server is running on port: " + process.env.PORT);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
