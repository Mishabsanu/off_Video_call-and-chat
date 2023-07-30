import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface TokenOptions {
  expiresIn?: string | number;
}

interface ConstructorInput {
  accessTokenSecret: string;
  accessTokenOptions?: TokenOptions;
  refreshTokenSecret?: string;
  refreshTokenOptions?: TokenOptions;

}
interface PasswordOptions {
  salt?: number;
}

const authServiceImpl = (data: ConstructorInput, options?: PasswordOptions) => {
  const salt = options?.salt || 10;

  const accessTokenSecret = data.accessTokenSecret;
  const accessTokenOptions = data.accessTokenOptions;
  const refreshTokenSecret = data.refreshTokenSecret;
  const refreshTokenOptions = data.refreshTokenOptions;

  if (!accessTokenSecret) console.warn("Access token secret is not provided");
  if (!refreshTokenSecret) console.warn("Refresh token secret is not provided");
  if (!accessTokenOptions) console.warn("Access token options is not provided");
  if (!refreshTokenOptions)
    console.warn("Refresh token options is not provided");

  const verifyAccessToken = (
    accessToken: string
  ): { email?: string; uid?: string } | any => {
    return jwt.verify(accessToken, accessTokenSecret);
  };

  const generateAccessToken = (payload: any) => {
    return jwt.sign(payload, accessTokenSecret, accessTokenOptions ?? {});
  };

  const verifyRefreshToken = (
    refreshToken: string
  ): { email?: string; userId?: string } | any => {
    if (!refreshTokenSecret) return null;
    return jwt.verify(refreshToken, refreshTokenSecret);
  };

  const generateRefreshToken = (payload: any) => {
    if (!refreshTokenSecret) return null;
    return jwt.sign(payload, refreshTokenSecret, refreshTokenOptions ?? {});
  };

  const generateTokens = (payload: any) => {
    if (!refreshTokenSecret) return null;
    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
  };
  const create = (password: string) => {
    return bcrypt.hash(password, salt);
  };

  const verify = (passwordHash: string, password: string) => {
    return bcrypt.compare(password, passwordHash);
  };

  return {
    verifyAccessToken,
    generateAccessToken,
    verifyRefreshToken,
    generateRefreshToken,
    generateTokens,
    create,
    verify,
  };
};

type authServiceImpl = ReturnType<typeof authServiceImpl>;
export default authServiceImpl;
