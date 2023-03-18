export interface SigInResponse {
  accessToken: string;
  accessTokenExpireAt: number;
}

export interface User {
  userId: string;
  name: string;
  email: string;
}
