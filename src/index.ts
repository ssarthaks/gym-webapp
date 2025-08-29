import app from "./app";
import { sequelize } from "./config/database";
import "./models/user.model";
import "./models/session.model";
import "./models/verificationCode.model";

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Database connection established successfully");

    // In production, migrations should be run separately before starting the server
    // For development, we can use sync if needed (but migrations are preferred)
    if (process.env.NODE_ENV !== "production") {
      // Sync only in development - use migrations in production
      await sequelize.sync({ alter: false });
      console.log("Database synchronized");
    }

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
