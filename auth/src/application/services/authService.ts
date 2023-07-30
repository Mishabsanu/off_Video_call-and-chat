import authServiceImpl from "../../frameworks/services/authService";

const authServiceInterface = (authService: authServiceImpl) => {
  const verifyAccessToken = authService.verifyAccessToken;
  const generateAccessToken = authService.generateAccessToken;
  const verifyRefreshToken = authService.verifyRefreshToken;
  const generateTokens = authService.generateTokens;
  const generateRefreshToken = authService.generateRefreshToken;
  const create = authService.create;
  const verify = authService.verify;

  return {
    verifyAccessToken,
    generateAccessToken,
    verifyRefreshToken,
    generateRefreshToken,
    generateTokens,
    create,
    verify
  };
};

type authServiceInterface = ReturnType<typeof authServiceInterface>;
export default authServiceInterface;
