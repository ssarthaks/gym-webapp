import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// load user from cookies on app start
import Cookies from "js-cookie";
import { setUser } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loadUserFromCookies = (dispatch: AppDispatch) => {
  const userCookie = Cookies.get("user");
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);
      dispatch(setUser(user));
    } catch (error) {
      console.error("Failed to parse user cookie", error);
    }
  }
};
