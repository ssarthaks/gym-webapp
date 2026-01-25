import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class VerificationCode extends Model {
  public id!: number;
  public email!: string;
  public code!: string; // Actually stores verification token, not a 6-digit code
  public type!: "email_verification" | "password_reset";
  public expiresAt!: Date;
  public isUsed!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

VerificationCode.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    code: {
      type: new DataTypes.STRING(100), // Increased from 6 to support longer tokens
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("email_verification", "password_reset"),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "verification_codes",
    sequelize,
    indexes: [
      {
        fields: ["email", "type", "isUsed"],
      },
      {
        fields: ["expiresAt"],
      },
    ],
  },
);
