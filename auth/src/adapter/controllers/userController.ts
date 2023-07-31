import { Request, Response } from "express";
import userRepositoryInteraface from "../../application/repositories/userRepositoryInteraface";
import userSignup from "../../application/use-cases/auth/signup";
import userLogin from "../../application/use-cases/auth/login";
import userForgotPassword from "../../application/use-cases/auth/forgetPassword";
import userResetPassword from "../../application/use-cases/auth/resetPassword";
import GetUtils from "../../utils/error";
import authServiceImpl from "../../frameworks/services/authService";

export interface IRequest extends Request {
  user: string,

}


const userController = (
  userRepository: userRepositoryInteraface,
  utils: GetUtils,
  authService: authServiceImpl
) => {
  const signup = async (req: Request, res: Response) => {
    try {
      const response = await userSignup(
        userRepository,
        authService,
        utils,
        req.body
      );

      res.send(response);
    } catch (error) {
      res.statusCode = error?.code ?? 500;
      res.send(error);
    }
  };

  const login = async (req: Request, res: Response) => {
    try {
      const response = await userLogin(
        userRepository,
        utils,
        authService,
        req.body
      );

      res.send(response);
    } catch (error) {
      res.statusCode = error?.code ?? 500;
      res.send(error);
    }
  
  };
  const forgotPassword = async (req: Request, res: Response) => {
    try {
      const response = await userForgotPassword(
        userRepository,
        utils,
        authService,
        req.body
      );

      res.send(response);
    } catch (error) {
      res.statusCode = error?.code ?? 500;
      res.send(error);
    }
   
  };
  const resetPassword = async (req: Request, res: Response) => {
    const { uid,} = req.params;
    try {
      const response = await userResetPassword(
        userRepository,
        utils,
        authService,
        req.body,
        uid,
        
       
        
        
      );

      res.send(response);
    } catch (error) {
      res.statusCode = error?.code ?? 500;
      res.send(error);
    }
   
  };
  return {
    signup,
    login,
    forgotPassword,
    resetPassword

  };
};

export default userController;
