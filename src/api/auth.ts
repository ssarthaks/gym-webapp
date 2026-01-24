import axios, { AxiosError } from "axios";

interface ValidationError {
  field: string;
  message: string;
}

interface ErrorResponse {
  message: string;
  errors?: ValidationError[];
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        email,
        password,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;

      if (errorData?.errors && errorData.errors.length > 0) {
        // Format validation errors into a readable message
        const errorMessages = errorData.errors
          .map((err) => err.message)
          .join(". ");
        throw new Error(errorMessages);
      } else if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    throw new Error("Login failed. Please try again.");
  }
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  accountType: string;
  address: string;
  phone: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
      userData,
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;

      if (errorData?.errors && errorData.errors.length > 0) {
        // Format validation errors into a readable message
        const errorMessages = errorData.errors
          .map((err) => err.message)
          .join(". ");
        throw new Error(errorMessages);
      } else if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    throw new Error("Registration failed. Please try again.");
  }
};

export const verifyAccount = async (token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify-account`,
      { token },
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying account:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;

      if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    throw new Error("Account verification failed. Please try again.");
  }
};
