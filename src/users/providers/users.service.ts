import { getPaginationDataUtil } from '../../lib/utils/get-pagination-data.util';
import { userSearchQueryHelper } from '../helpers/user-search-query.helper';
import { IGetAllUsersQuery } from '../interfaces/get-all-users-query.interface';
import { mapUserSortParametersHelper } from '../interfaces/map-user-sort-parameters.helprs';
import { IUser } from '../interfaces/user.interface';
import UserModel from '../users.model';

export class UsersService {
  // get all users
  async getAllUsers(query: IGetAllUsersQuery) {
    const { limit, page, search, gender, isVerified, role, sort } = query;

    const filter: Record<string, any> = {};

    if (gender) filter.gender = gender;
    if (isVerified) filter.isVerified = isVerified;
    if (role) filter.role = role;

    if (search) {
      // search by firstName, lastName, username, phoneNumber, address
      filter.$or = userSearchQueryHelper(search);
    }

    // pagination
    const { skip, _limit, totalPages, _page } = await getPaginationDataUtil(
      limit,
      page,
      UserModel
    );

    const _sort: Partial<Record<keyof IUser, any>> =
      mapUserSortParametersHelper(sort);

    const users = await UserModel.find(filter)
      .sort(_sort)
      .skip(skip)
      .limit(_limit);

    return {
      pagination: {
        totalPages,
        limit: _limit,
        page: _page,
      },
      users,
    };
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

  // find one
  async findOne(query: Partial<IUser>) {
    const user = await UserModel.findOne(query);
    return user;
  }
}
