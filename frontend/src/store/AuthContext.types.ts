export interface AuthContextType {
  accessToken: string,
  login: (token: string) => void;
  logout: () => void;
}