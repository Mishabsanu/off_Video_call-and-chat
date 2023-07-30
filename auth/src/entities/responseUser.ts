interface UserDataResponse {
  userId?: string;
  userName?: string;
  email?: string;
  gender?: string;
  avatar?: string;
  countrie?: string;
  password?: string;
  acceptTerms?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export default UserDataResponse;
