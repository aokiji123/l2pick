import { User } from "./user";

enum TokenType {
  Bearer = "Bearer",
}

export enum Provider {
  Discord = "discord",
  Google = "google",
}

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginRequest = {
  email: string;
  password: string;
  remember_me: boolean;
};

export type TelegramRequest = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
};

export type RegisterResponse = {
  user: User;
  access_token: string;
  token_type: TokenType.Bearer;
  expires_in: number;
};

export type LoginResponse = RegisterResponse;
export type AuthResponse = RegisterResponse;
