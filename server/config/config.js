const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "gym_webapp_db",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    migrationStorageTableName: "sequelize_meta",
    seederStorageTableName: "sequelize_data",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    migrationStorageTableName: "sequelize_meta",
    seederStorageTableName: "sequelize_data",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    migrationStorageTableName: "sequelize_meta",
    seederStorageTableName: "sequelize_data",
    logging: false,
  },
};
