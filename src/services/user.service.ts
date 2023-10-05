import axios, { AxiosResponse } from "axios";

//This users services is made for http request and nothing more...
export class UserService {
  private api: any;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`, //http://localhost:3001
    });
  }

  async getUser(id: string) {
    const user = await this.api.get(`/user/${id}`);
    return user.data;
  }

  public async requestPasswordReset(email: string): Promise<any> {
    const response = await this.api.post("/user/request-password-reset", {
      email,
    });
    return response.data;
  }

  public async resetPassword(token: string, newPassword: string): Promise<any> {
    const response = await this.api.post("/user/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  }

  public async verifyResetToken(token: string): Promise<{ isValid: boolean }> {
    const response: AxiosResponse<any> = await this.api.post(
      "/user/verify-reset-token",
      {
        token,
      }
    );
    return response.data.isValid;
  }
}
