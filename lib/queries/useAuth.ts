import axiosInstance from "../api";
import {
  AuthResponse,
  LoginRequest,
  LoginResponse,
  Provider,
  RegisterRequest,
  RegisterResponse,
  TelegramRequest,
} from "../types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "../types/user";

// ------------------------------ FUNCTIONS ------------------------------

const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

const authProviderRedirect = async (provider: Provider) => {
  const response = await axiosInstance.get(`/auth/${provider}/redirect`);
  return response.data;
};

const authProviderCallback = async (
  provider: Provider,
): Promise<AuthResponse> => {
  const response = await axiosInstance.get(`/auth/${provider}/callback`);
  return response.data;
};

const authTelegram = async (data: TelegramRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/telegram", data);
  return response.data;
};

const getUser = async (): Promise<User> => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

// ------------------------------ QUERIES  AND MUTATIONS ------------------------------

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export const useAuthProviderRedirect = (provider: Provider) => {
  return useQuery({
    queryKey: ["auth", "provider", "redirect", provider],
    queryFn: () => authProviderRedirect(provider),
  });
};

export const useAuthProviderCallback = (provider: Provider) => {
  return useQuery({
    queryKey: ["auth", "provider", "callback", provider],
    queryFn: () => authProviderCallback(provider),
  });
};

export const useAuthTelegram = () => {
  return useMutation({
    mutationFn: authTelegram,
  });
};

export const useGetUser = (isAuthenticated?: boolean) => {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: getUser,
    staleTime: 60 * 1000,
    enabled: isAuthenticated !== false,
    retry: false,
  });
};
