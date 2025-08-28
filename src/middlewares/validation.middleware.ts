import { Request, Response, NextFunction } from "express";

// Helper function to validate required fields
export const validateRequiredFields = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body is required",
        errors: [{ field: "body", message: "No data provided" }],
      });
    }

    // Check for missing required fields
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      const formatFieldName = (field: string) => {
        const fieldMappings: { [key: string]: string } = {
          oldPassword: "Old password",
          newPassword: "New password",
          newEmail: "New email",
        };
        return (
          fieldMappings[field] || field.charAt(0).toUpperCase() + field.slice(1)
        );
      };

      return res.status(400).json({
        message: "Missing required fields",
        errors: missingFields.map((field) => ({
          field,
          message: `${formatFieldName(field)} is required`,
        })),
      });
    }

    next();
  };
};

// Special validation for updateProfile (at least one update field required)
export const validateProfileUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Request body is required",
      errors: [{ field: "body", message: "No data provided" }],
    });
  }

  const { name, phone, newEmail, address } = req.body;

  if (!name && !phone && !newEmail && !address) {
    return res.status(400).json({
      message: "No update data provided",
      errors: [
        {
          field: "update",
          message:
            "At least one field (name, phone, newEmail, or address) must be provided to update",
        },
      ],
    });
  }

  next();
};
