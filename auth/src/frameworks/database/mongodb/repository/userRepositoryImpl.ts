import User from "../../../../entities/user";
import UserModel from "../models/user";

const userRepositoryImpl = () => {
  const signup = (userData: User) => {
    return new UserModel(userData).save();
  };

  const login = (userId: string) => {
    return UserModel.findOne({ userId: userId });
  };

  const getByEmail = async (email: string) => {
    return UserModel.findOne({ email: email });
  };
  const getById = async (userId: string) => {
    return UserModel.findOne({ userId: userId });
  };
  const passwordUpdate = async (userId: string,hashedPassword:string) => {
    return UserModel.findOneAndUpdate({ userId:userId }, { $set: { password: hashedPassword } })
  };



  return {
    signup,
    login,
    getByEmail,
    getById,
    passwordUpdate
   

  };
};

type userRepositoryImpl = ReturnType<typeof userRepositoryImpl>;
export default userRepositoryImpl;
