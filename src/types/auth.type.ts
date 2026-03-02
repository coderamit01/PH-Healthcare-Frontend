export interface ILoginResponse {
  token: string,
  accessToken: string,
  refreshToken: string,
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    image: string;
    isDeleted: boolean;
    role: string;
    status: string;
    needPasswordChange: boolean;
  };
}