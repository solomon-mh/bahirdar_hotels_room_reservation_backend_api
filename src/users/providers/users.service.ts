import { IUser } from '../interfaces/user.interface';
import UserModel from '../users.model';

export class UsersService {
  // get all users
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
  // get user
  async getUser(id: string) {
    const user = await UserModel.findById(id);
    return user;
  }
  // create user
  async createUser(data: IUser) {
    const user = await UserModel.create(data);
    return user;
  }
  // update user
  async updateUser(id: string, data: Partial<IUser>) {
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
    return user;
  }
  // delete user
  async deleteUser(id: string) {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  }
}
