import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public address?: string;
  public accountType!: "individual" | "business";
  public password!: string;
  public emailVerified!: boolean;
  public isDeleted!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: new DataTypes.STRING(32),
      allowNull: true,
    },
    address: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
    accountType: {
      type: new DataTypes.ENUM("individual", "business"),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);
