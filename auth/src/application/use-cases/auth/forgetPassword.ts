import getConfigs from "../../../config/config";
import userRepositoryInteraface from "../../repositories/userRepositoryInteraface";
import GetUtils from "../../../utils/error";
import User from "../../../entities/user";
import UserDataResponse from "../../../entities/responseUser";
import authServiceImpl from "../../../frameworks/services/authService";
import nodemailer from "nodemailer";


export default async function userForgotPassword(
    userRepository: userRepositoryInteraface,
    utils: GetUtils,
    authService:authServiceImpl,
    data: { email: string}
  ) {
    const config = getConfigs();
    let { email} = data;
    if (!email) throw utils.createError(400, "email is required to login");

    if (typeof email !== "string")
    throw utils.createError(400, "email must be a string");

    email = email?.trim();
    const userDataFromDatabase = await userRepository
    .getByEmail(email)
    .catch(utils.throwInternalError("error while fetching user data"));
  if (!userDataFromDatabase)
    throw utils.createError(400, "account with this email not exist");

    const token = authService.generateTokens({ email });

    const link = `<a href="${config.CLIENT_URL.URL}resetPassword/${userDataFromDatabase._id}">Click to reset passowrd</a>`;
   
    const testAccount = await nodemailer.createTestAccount();


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: config.mail.userMail,
            pass: config.mail.userPass
        }
    });



    const info = await transporter.sendMail({
        from: config.mail.userMail, 
        to: userDataFromDatabase.email, 
        subject: "Reset password", 
        html: link, 
    });
 


  }