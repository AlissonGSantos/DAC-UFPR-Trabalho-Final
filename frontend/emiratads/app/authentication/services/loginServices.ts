import { LoginRequest, UserAuth } from "@/app/types/AuthTypes";

const loginServices = {
  login:  async (loginParameters: LoginRequest): Promise<UserAuth> =>{
    console.log("identificação: ", loginParameters)
    return {} as UserAuth
  }
}

export default loginServices

