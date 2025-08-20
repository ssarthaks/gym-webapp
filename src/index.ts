import app from "./app";
import { sequelize } from "./config/database";

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
