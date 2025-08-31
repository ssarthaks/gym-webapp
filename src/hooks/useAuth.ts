// src/hooks/useAuth.ts
import { loginUser, registerUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useAppDispatch } from "./reduxHooks";
import { setUser } from "@/store/authSlice";

const storeAuthData = (dispatch: any, data: { token: string; user: any }) => {
  // Save token securely in cookies
  Cookies.set("token", data.token, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });

  // Save user info in cookies for persistence
  Cookies.set("user", JSON.stringify(data.user), {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });

  // Dispatch user info to Redux
  dispatch(setUser(data.user));
};

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      storeAuthData(dispatch, data);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};

export const useRegister = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (userData: {
      name: string;
      email: string;
      accountType: string;
      address: string;
      phone: string;
      password: string;
    }) => registerUser(userData),
    onSuccess: (data) => {
      storeAuthData(dispatch, data);
    },
    onError: (error) => {
      console.error("Register error:", error);
    },
  });
};
