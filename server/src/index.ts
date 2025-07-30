import { prisma } from "./config/prisma";
import { httpServer } from "./app";
import logger from "./utils/logger";

const PORT = process.env.PORT || 8090;

const startServer = async () => {
  try {
    console.log("🔄 Starting server...");

    // Kết nối database (optional)
    try {
      await prisma.$connect();
      console.log("✅ Database connected");
    } catch (dbError) {
      console.log("⚠️ Database connection failed, continuing without DB");
    }

    httpServer.listen(PORT, () => {
      logger.info(
        `📑 Visit the documentation at: http://localhost:${
          process.env.PORT || 8090
        }`
      );
      logger.info("⚙️  Server is running on port: " + process.env.PORT);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
