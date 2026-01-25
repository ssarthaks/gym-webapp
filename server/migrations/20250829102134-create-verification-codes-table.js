"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("verification_codes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(100), // Stores verification tokens (not 6-digit codes)
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("email_verification", "password_reset"),
        allowNull: false,
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isUsed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });

    // Add indexes
    await queryInterface.addIndex("verification_codes", {
      fields: ["email", "type", "isUsed"],
      name: "verification_codes_email_type_used_idx",
    });
    await queryInterface.addIndex("verification_codes", {
      fields: ["expiresAt"],
      name: "verification_codes_expires_at_idx",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("verification_codes");
  },
};
