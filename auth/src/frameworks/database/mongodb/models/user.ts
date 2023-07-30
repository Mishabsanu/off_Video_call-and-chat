import { model } from "mongoose";
import { userSchema } from "./user.schema";
import User from "../../../../entities/user";

const UserModel = model<User>("users", userSchema);

export default UserModel;
