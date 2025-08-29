import {
  isEmail,
  isStrongPassword,
  isLength,
  isEmpty,
  isMobilePhone,
  normalizeEmail,
  escape,
} from "validator";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  sanitizedData?: any;
}

// Individual field validators
export const validateName = (name: string): ValidationError | null => {
  if (!name || isEmpty(name.trim())) {
    return { field: "name", message: "Name is required" };
  }
  if (!isLength(name.trim(), { min: 2, max: 50 })) {
    return {
      field: "name",
      message: "Name must be between 2 and 50 characters",
    };
  }
  return null;
};

export const validateEmail = (email: string): ValidationError | null => {
  if (!email || isEmpty(email.trim())) {
    return { field: "email", message: "Email is required" };
  }
  if (!isEmail(email)) {
    return { field: "email", message: "Invalid email format" };
  }
  return null;
};

export const validateAddress = (address: string): ValidationError | null => {
  if (!address || isEmpty(address.trim())) {
    return { field: "address", message: "Address is required" };
  }
  return null;
};

export const validatePhone = (phone: string): ValidationError | null => {
  if (!phone || isEmpty(phone.trim())) {
    return { field: "phone", message: "Phone is required" };
  }
  if (!isMobilePhone(phone, "any")) {
    return { field: "phone", message: "Invalid phone number format" };
  }
  return null;
};

export const validatePassword = (password: string): ValidationError | null => {
  if (!password || isEmpty(password)) {
    return { field: "password", message: "Password is required" };
  }
  if (
    !isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return {
      field: "password",
      message:
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol",
    };
  }
  return null;
};

// Sanitization functions
export const sanitizeEmail = (email: string): string | null => {
  const normalized = normalizeEmail(email.trim().toLowerCase());
  return normalized || null;
};

export const sanitizeName = (name: string): string => {
  return escape(name.trim());
};

export const sanitizePhone = (phone: string): string => {
  return phone.trim();
};

export const sanitizeAddress = (address: string): string => {
  return escape(address.trim());
};

// Composite validation functions for different scenarios
export const validateRegistrationData = (data: {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  address?: string;
  accountType?: "individual" | "business";
}): ValidationResult => {
  const errors: ValidationError[] = [];
  const { name, email, phone, password, address, accountType } = data;

  // Check for required fields first
  if (name === undefined || name === null) {
    errors.push({ field: "name", message: "Name is required" });
  } else {
    const nameError = validateName(name);
    if (nameError) errors.push(nameError);
  }

  if (email === undefined || email === null) {
    errors.push({ field: "email", message: "Email is required" });
  } else {
    const emailError = validateEmail(email);
    if (emailError) errors.push(emailError);
  }

  if (phone === undefined || phone === null) {
    errors.push({ field: "phone", message: "Phone is required" });
  } else {
    const phoneError = validatePhone(phone);
    if (phoneError) errors.push(phoneError);
  }

  if (address === undefined || address === null) {
    errors.push({ field: "address", message: "Address is required" });
  } else {
    const addressError = validateAddress(address);
    if (addressError) errors.push(addressError);
  }

  if (accountType === undefined || accountType === null) {
    errors.push({ field: "accountType", message: "Account type is required" });
  } else if (!["individual", "business"].includes(accountType)) {
    errors.push({ field: "accountType", message: "Invalid account type" });
  }

  if (password === undefined || password === null) {
    errors.push({ field: "password", message: "Password is required" });
  } else {
    const passwordError = validatePassword(password);
    if (passwordError) errors.push(passwordError);
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize data if validation passes
  const sanitizedData: any = {};

  if (name) sanitizedData.name = sanitizeName(name);
  if (email) {
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return {
        isValid: false,
        errors: [{ field: "email", message: "Invalid email format" }],
      };
    }
    sanitizedData.email = sanitizedEmail;
  }
  if (phone) sanitizedData.phone = sanitizePhone(phone);
  if (address) sanitizedData.address = sanitizeAddress(address);
  if (accountType) sanitizedData.accountType = accountType;
  if (password) sanitizedData.password = password;

  return { isValid: true, errors: [], sanitizedData };
};

export const validateLoginData = (data: {
  email?: string;
  password?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];
  const { email, password } = data;

  // Check for required fields first
  if (email === undefined || email === null) {
    errors.push({ field: "email", message: "Email is required" });
  } else {
    const emailError = validateEmail(email);
    if (emailError) errors.push(emailError);
  }

  if (password === undefined || password === null) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (!password || isEmpty(password)) {
    errors.push({ field: "password", message: "Password is required" });
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize data
  const sanitizedData: any = {};
  if (email) {
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return {
        isValid: false,
        errors: [{ field: "email", message: "Invalid email format" }],
      };
    }
    sanitizedData.email = sanitizedEmail;
  }
  if (password) sanitizedData.password = password;

  return { isValid: true, errors: [], sanitizedData };
};

export const validatePasswordChange = (data: {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];
  const { email, oldPassword, newPassword } = data;

  // Check for required fields first
  if (email === undefined || email === null) {
    errors.push({ field: "email", message: "Email is required" });
  } else {
    const emailError = validateEmail(email);
    if (emailError) errors.push(emailError);
  }

  if (oldPassword === undefined || oldPassword === null) {
    errors.push({ field: "oldPassword", message: "Old password is required" });
  } else if (!oldPassword || isEmpty(oldPassword)) {
    errors.push({
      field: "oldPassword",
      message: "Old password is required",
    });
  }

  if (newPassword === undefined || newPassword === null) {
    errors.push({ field: "newPassword", message: "New password is required" });
  } else {
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      errors.push({ field: "newPassword", message: passwordError.message });
    }
  }

  // Check if passwords are the same
  if (oldPassword && newPassword && oldPassword === newPassword) {
    errors.push({
      field: "newPassword",
      message: "New password must be different from the old password",
    });
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize data
  const sanitizedData: any = {};
  if (email) {
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return {
        isValid: false,
        errors: [{ field: "email", message: "Invalid email format" }],
      };
    }
    sanitizedData.email = sanitizedEmail;
  }
  if (oldPassword) sanitizedData.oldPassword = oldPassword;
  if (newPassword) sanitizedData.newPassword = newPassword;

  return { isValid: true, errors: [], sanitizedData };
};

export const validateProfileUpdate = (data: {
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  newEmail?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];
  const { email, name, phone, address, newEmail } = data;

  // Email is required for profile updates (to identify the user)
  if (email === undefined || email === null) {
    errors.push({ field: "email", message: "Email is required" });
  } else {
    const emailError = validateEmail(email);
    if (emailError) errors.push(emailError);
  }

  // Address is required for profile updates
  if (address === undefined || address === null) {
    errors.push({ field: "address", message: "Address is required" });
  } else {
    const addressError = validateAddress(address);
    if (addressError) errors.push(addressError);
  }

  // Other fields are optional but must be valid if provided
  if (name !== undefined && name !== null && name !== "") {
    const nameError = validateName(name);
    if (nameError) errors.push(nameError);
  }

  if (phone !== undefined && phone !== null && phone !== "") {
    const phoneError = validatePhone(phone);
    if (phoneError) errors.push(phoneError);
  }

  if (newEmail !== undefined && newEmail !== null && newEmail !== "") {
    const newEmailError = validateEmail(newEmail);
    if (newEmailError) {
      errors.push({ field: "newEmail", message: newEmailError.message });
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize data
  const sanitizedData: any = {};
  if (email) {
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return {
        isValid: false,
        errors: [{ field: "email", message: "Invalid email format" }],
      };
    }
    sanitizedData.email = sanitizedEmail;
  }
  if (name !== undefined && name !== null && name !== "") {
    sanitizedData.name = sanitizeName(name);
  }
  if (phone !== undefined && phone !== null && phone !== "") {
    sanitizedData.phone = sanitizePhone(phone);
  }
  if (address !== undefined && address !== null && address !== "") {
    sanitizedData.address = sanitizeAddress(address);
  }
  if (newEmail !== undefined && newEmail !== null && newEmail !== "") {
    const sanitizedNewEmail = sanitizeEmail(newEmail);
    if (!sanitizedNewEmail) {
      return {
        isValid: false,
        errors: [{ field: "newEmail", message: "Invalid email format" }],
      };
    }
    sanitizedData.newEmail = sanitizedNewEmail;
  }

  return { isValid: true, errors: [], sanitizedData };
};

export const validateEmailOnly = (data: {
  email?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];
  const { email } = data;

  // Email is required
  if (email === undefined || email === null) {
    errors.push({ field: "email", message: "Email is required" });
  } else {
    const emailError = validateEmail(email);
    if (emailError) errors.push(emailError);
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize data
  const sanitizedData: any = {};
  if (email) {
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return {
        isValid: false,
        errors: [{ field: "email", message: "Invalid email format" }],
      };
    }
    sanitizedData.email = sanitizedEmail;
  }

  return { isValid: true, errors: [], sanitizedData };
};

// Validation for token-authenticated password change (no email required)
export const validatePasswordChangeAuth = (data: {
  oldPassword?: string;
  newPassword?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];
  const { oldPassword, newPassword } = data;

  if (oldPassword === undefined || oldPassword === null) {
    errors.push({ field: "oldPassword", message: "Old password is required" });
  } else if (!oldPassword || isEmpty(oldPassword)) {
    errors.push({
      field: "oldPassword",
      message: "Old password is required",
    });
  }

  if (newPassword === undefined || newPassword === null) {
    errors.push({ field: "newPassword", message: "New password is required" });
  } else {
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      errors.push({ field: "newPassword", message: passwordError.message });
    }
  }

  // Check if passwords are the same
  if (oldPassword && newPassword && oldPassword === newPassword) {
    errors.push({
      field: "newPassword",
      message: "New password must be different from the old password",
    });
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize data
  const sanitizedData: any = {};
  if (oldPassword) sanitizedData.oldPassword = oldPassword;
  if (newPassword) sanitizedData.newPassword = newPassword;

  return { isValid: true, errors: [], sanitizedData };
};

// Validation for token-authenticated profile update (no email required)
export const validateProfileUpdateAuth = (data: {
  name?: string;
  phone?: string;
  address?: string;
  newEmail?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];
  const { name, phone, address, newEmail } = data;

  // All fields are optional but must be valid if provided
  if (name !== undefined && name !== null && name !== "") {
    const nameError = validateName(name);
    if (nameError) errors.push(nameError);
  }

  if (phone !== undefined && phone !== null && phone !== "") {
    const phoneError = validatePhone(phone);
    if (phoneError) errors.push(phoneError);
  }

  if (address !== undefined && address !== null && address !== "") {
    const addressError = validateAddress(address);
    if (addressError) errors.push(addressError);
  }

  if (newEmail !== undefined && newEmail !== null && newEmail !== "") {
    const emailError = validateEmail(newEmail);
    if (emailError) {
      errors.push({ field: "newEmail", message: emailError.message });
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize data
  const sanitizedData: any = {};
  if (name !== undefined) sanitizedData.name = name ? escape(name.trim()) : "";
  if (phone !== undefined) sanitizedData.phone = phone ? phone.trim() : "";
  if (address !== undefined)
    sanitizedData.address = address ? escape(address.trim()) : "";
  if (newEmail !== undefined) {
    if (newEmail) {
      const sanitizedEmail = sanitizeEmail(newEmail);
      if (!sanitizedEmail) {
        return {
          isValid: false,
          errors: [{ field: "newEmail", message: "Invalid email format" }],
        };
      }
      sanitizedData.newEmail = sanitizedEmail;
    } else {
      sanitizedData.newEmail = "";
    }
  }

  return { isValid: true, errors: [], sanitizedData };
};
