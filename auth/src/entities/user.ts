interface User {
  userId?: string;
  userName?: string;
  email?: string;
  password?: string;
  gender?: string;
  avatar?: string;
  countrie?: string;
  createdAt?: Date;
  updatedAt?: Date;
  acceptTerms?:boolean
}

export default User;
