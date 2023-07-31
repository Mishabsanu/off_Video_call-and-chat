import userRepositoryImpl from "../../frameworks/database/mongodb/repository/userRepositoryImpl";

const userRepositoryInteraface = (respository: userRepositoryImpl) => {
  const signup = respository.signup;
  const login = respository.login;
  const getByEmail = respository.getByEmail;
  const getById = respository.getById;
  const passwordUpdate = respository.passwordUpdate;
 
  

  return {
    signup,
    login,
    getByEmail,
    getById,
    passwordUpdate

  
  };
};
type userRepositoryInteraface = ReturnType<typeof userRepositoryInteraface>;
export default userRepositoryInteraface;
