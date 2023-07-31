import ExpressApp from "express";
import userRepositoryInteraface from "../../../application/repositories/userRepositoryInteraface";
import userRepositoryImpl from "../../database/mongodb/repository/userRepositoryImpl";
import userController from "../../../adapter/controllers/userController";
import GetUtils from "../../../utils/error";
import GetJwt from "../../../frameworks/services/authService";
import getConfigs from "../../../config/config";
import authServiceImpl from "../../../frameworks/services/authService";
export default function userRouter(express: typeof ExpressApp) {
  const router = express.Router();
  const configs = getConfigs();

  const userRepository = userRepositoryInteraface(userRepositoryImpl());
  const utils = new GetUtils();
  const authService =  authServiceImpl({
    accessTokenSecret: configs.jwt.accessSecret,
    accessTokenOptions: configs.jwt.accessOptions,
    refreshTokenOptions: configs.jwt.refreshOptions,
    refreshTokenSecret: configs.jwt.refreshSecret,
  });


  const controller = userController(userRepository, utils,authService);

  router.route("/signup").post(controller.signup);
  router.route("/login").post(controller.login);
  router.route("/forgetPassword").post(controller.forgotPassword);
  router.route("/resetPassword/:id").post(controller.resetPassword);


  return router;
}
