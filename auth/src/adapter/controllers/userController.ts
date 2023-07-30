import { Request, Response } from "express";
import userRepositoryInteraface from "../../application/repositories/userRepositoryInteraface";
import userSignup from "../../application/use-cases/auth/signup";
import userLogin from "../../application/use-cases/auth/login";
import GetUtils from "../../utils/error";
import authServiceImpl from "../../frameworks/services/authService";

export interface IRequest extends Request {
  user: string;
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
  return {
    signup,
    login,

  };
};

export default userController;
