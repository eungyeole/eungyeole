import { apiClient } from "../client";
import { SigInResponse, User } from "./types";

export const sendVertificationCodeApi = async (body: { email: string }) => {
  return await apiClient.post<unknown>("/users/verification-code", body);
};

export const signInApi = async (body: { email: string; code: string }) => {
  return await apiClient.post<SigInResponse>("/users/signin", body);
};

export const getUserApi = async () => {
  return await apiClient.get<User>("/users");
};

export const refreshAccessTokenApi = async (refreshToken: string) => {
  return await apiClient.post("/users/refresh-token", { refreshToken });
};
