import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

interface ValidationError {
  field: string;
  message: string;
}

interface ErrorResponse {
  message: string;
  errors?: ValidationError[];
}

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  accountType?: "individual" | "business";
}) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
      {
        ...getAuthHeaders(),
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;
      if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    throw new Error("Failed to fetch users. Please try again.");
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;
      if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    throw new Error("Failed to fetch user. Please try again.");
  }
};

export const updateUser = async (
  id: number,
  userData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    accountType?: "individual" | "business";
  },
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
      userData,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;

      if (errorData?.errors && errorData.errors.length > 0) {
        const errorMessages = errorData.errors
          .map((err) => err.message)
          .join(". ");
        throw new Error(errorMessages);
      } else if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    throw new Error("Failed to update user. Please try again.");
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;
      if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    throw new Error("Failed to delete user. Please try again.");
  }
};

export const getUserStats = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/stats`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;
      if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    throw new Error("Failed to fetch user stats. Please try again.");
  }
};

export const getCurrentUser = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;
      if (errorData?.message) {
        throw new Error(errorData.message);
      }
    }
    throw new Error("Failed to fetch user profile. Please try again.");
  }
};
