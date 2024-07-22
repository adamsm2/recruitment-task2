import { apiClient } from "./client.ts";
import { LoginUserRequest } from "../dto/LoginUserRequest.ts";

async function loginUser(loginUserRequest: LoginUserRequest) {
  const response = await apiClient
    .post("/login", loginUserRequest);
  return response.data;
}

export default { loginUser };