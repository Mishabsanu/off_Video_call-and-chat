import getConfigs from "../../../config/config";
import userRepositoryInteraface from "../../repositories/userRepositoryInteraface";
import GetUtils from "../../../utils/error";
import User from "../../../entities/user";
import UserDataResponse from "../../../entities/responseUser";
import authServiceImpl from "../../../frameworks/services/authService";
export default async function userSignup(
  userRepository: userRepositoryInteraface,
  authService: authServiceImpl,
  utils: GetUtils,
  data: {
    userName: string;
    email: string;
    password: string;
    gender: string;
    avatar: string;
    countrie: string;
    acceptTerms: boolean;
  }
) {
  if (!data?.userName) throw utils.createError(400, "userName is required");
  if (!data?.email) throw utils.createError(400, "email is required");
  if (!data?.password) throw utils.createError(400, "password is required");
  if (!data?.gender) throw utils.createError(400, "gender is required");
  if (!data?.avatar) throw utils.createError(400, "avathar is required");
  if (!data?.countrie) throw utils.createError(400, "countrie is required");
  if (!data?.acceptTerms)
    throw utils.createError(400, "acceptTerms is required");

  if (typeof data.userName !== "string")
    throw utils.createError(400, "userName must be a string");
  if (typeof data.email !== "string")
    throw utils.createError(400, "email must be a string");
  if (typeof data.password !== "string")
    throw utils.createError(400, "password must be a string");
  if (typeof data.gender !== "string")
    throw utils.createError(400, "gender must be a string");
  if (typeof data.avatar !== "string")
    throw utils.createError(400, "avathar must be a string");
  if (typeof data.countrie !== "string")
    throw utils.createError(400, "countrie must be a string");
  if (typeof data.acceptTerms !== "boolean")
    throw utils.createError(400, "acceptTerms must be a boolean");

  data.userName = data.userName.trim().toLowerCase();
  data.email = data.email.trim().toLowerCase();
  data.password = data.password.trim();

  if (data.password.length < 6)
    throw utils.createError(400, "password must be at least 6 characters long");
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data?.email))
    throw utils.createError(400, "please provide a valid email");

  const existingUserData = await userRepository
    .getByEmail(data.email)
    .catch(utils.throwInternalError("faild to fetch user data"));
  if (existingUserData)
    throw utils.createError(400, "user with this email already exists");

  const hashedPassword = await authService.create(data.password.trim());

  const newUser: User = {
    userName: data.userName?.trim()?.toLowerCase(),
    email: data.email?.trim()?.toLowerCase(),
    password: hashedPassword,
    gender: data.gender,
    avatar: data.avatar,
    countrie: data.countrie,
    acceptTerms: data.acceptTerms,
  };

  await userRepository        
    .signup(newUser)
    .catch(utils.throwInternalError("Faild to create user"));

  // IF user need to be verified with email, check here
  // ...
  const token = authService.generateTokens({ email: newUser?.email });

  const userDataResponse: UserDataResponse = {
    userName: newUser?.userName,
    email: newUser?.email,
    password: newUser?.password,
    gender: newUser?.gender,
    avatar: newUser?.avatar,
    countrie: newUser?.countrie,
    acceptTerms: newUser?.acceptTerms,
    tokens: token,
  };

  return userDataResponse;
}
