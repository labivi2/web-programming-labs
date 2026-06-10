export interface User {
  id: number;
  email: string;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}
