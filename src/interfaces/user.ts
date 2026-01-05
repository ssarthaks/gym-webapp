export interface UserInterface {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  accountType: "individual" | "business";
  emailVerified: boolean;
}

export interface AuthState {
  user: UserInterface | null;
  isAuthenticated: boolean;
  token: string | null;
}
