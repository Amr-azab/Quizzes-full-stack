import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../model/UserModel";

export interface SignupBody {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "teacher" | "student";
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface ProtectBody {
  user: IUser;
}

export interface DecodedToken extends JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
