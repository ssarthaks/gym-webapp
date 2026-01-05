import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// load user from cookies on app start
import Cookies from "js-cookie";
import { setAuth } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loadUserFromCookies = (dispatch: AppDispatch) => {
  const userCookie = Cookies.get("user");
  const tokenCookie = Cookies.get("token");

  if (userCookie && tokenCookie) {
    try {
      const user = JSON.parse(userCookie);
      dispatch(setAuth({ user, token: tokenCookie }));
    } catch (error) {
      console.error("Failed to parse user cookie", error);
      // Clear invalid cookies
      Cookies.remove("user");
      Cookies.remove("token");
    }
  }
};
