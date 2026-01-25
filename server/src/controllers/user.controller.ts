import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// Get all users (admin only)
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page = 1, limit = 10, search = "", accountType } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    const whereClause: any = {
      isDeleted: false,
    };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
      ];
    }

    if (
      accountType &&
      (accountType === "individual" || accountType === "business")
    ) {
      whereClause.accountType = accountType;
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ["password"] },
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      users,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id, isDeleted: false },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// Update user (admin can update any user, users can update themselves)
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, accountType } = req.body;

    // Check if user is updating themselves or is admin
    const requestingUser = (req as any).user;
    if (
      requestingUser.id !== Number(id) &&
      requestingUser.accountType !== "business"
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this user" });
    }

    const user = await User.findOne({ where: { id, isDeleted: false } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is being changed and if it's already in use
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== user.id) {
        return res.status(400).json({ message: "Email already in use" });
      }
      user.email = email;
      user.emailVerified = false; // Reset verification if email changes
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address !== undefined) user.address = address;

    // Only admin can change accountType
    if (accountType && requestingUser.accountType === "business") {
      user.accountType = accountType;
    }

    await user.save();

    const updatedUser = user.toJSON();
    delete (updatedUser as any).password;

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user (soft delete)
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // Check if user is deleting themselves or is admin
    const requestingUser = (req as any).user;
    if (
      requestingUser.id !== Number(id) &&
      requestingUser.accountType !== "business"
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this user" });
    }

    const user = await User.findOne({ where: { id, isDeleted: false } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isDeleted = true;
    await user.save();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get user stats (for dashboard)
export const getUserStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const totalUsers = await User.count({ where: { isDeleted: false } });
    const individualUsers = await User.count({
      where: { isDeleted: false, accountType: "individual" },
    });
    const businessUsers = await User.count({
      where: { isDeleted: false, accountType: "business" },
    });
    const verifiedUsers = await User.count({
      where: { isDeleted: false, emailVerified: true },
    });

    // Get users created in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newUsers = await User.count({
      where: {
        isDeleted: false,
        createdAt: { [Op.gte]: thirtyDaysAgo },
      },
    });

    res.status(200).json({
      stats: {
        totalUsers,
        individualUsers,
        businessUsers,
        verifiedUsers,
        newUsersLast30Days: newUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};
