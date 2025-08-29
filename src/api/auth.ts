import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
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
    const response = await axios.post(`${process.env.BACKEND_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
