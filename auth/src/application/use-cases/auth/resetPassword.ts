
import getConfigs from "../../../config/config";
import userRepositoryInteraface from "../../repositories/userRepositoryInteraface";
import GetUtils from "../../../utils/error";
import User from "../../../entities/user";
import UserDataResponse from "../../../entities/responseUser";
import authServiceImpl from "../../../frameworks/services/authService";


export default async function userresetPassword(
  userRepository: userRepositoryInteraface,
  utils: GetUtils,
  authService: authServiceImpl,
  data: { password: string },
  userId: string,
 

) {
    const config=getConfigs()
  let { password } = data;

  

  if (!password) throw utils.createError(400, "password is  required to login");

  if (typeof password !== "string")
    throw utils.createError(400, "password must be a string");

  password = password?.trim();
  const userDataFromDatabase = await userRepository
  .getById(userId)
  .catch(utils.throwInternalError("error while fetching user data"));
if (!userDataFromDatabase)
  throw utils.createError(400, "account with this user not exist");

  

  const hashedPassword = await authService.create(data.password.trim());
  const updatedUser = await userRepository
  .passwordUpdate(userId,hashedPassword)
  .catch(utils.throwInternalError("error while fetching user data"));


  
 
}
