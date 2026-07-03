export interface LoginResponse {
  access_token: string;
  expires_in: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
}